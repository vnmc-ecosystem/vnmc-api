import { get_beatmaps_osu } from "$lib/osu/beatmaps";
import { beatmaps } from "./auth";
import type { Beatmap } from "./types";

export async function get_beatmaps_db(ids: number[]) {
	// query from cache
    if (!ids.length) return []; // no maps

    const id_set = new Set(ids); // delete dups
    const cached_beatmaps = await beatmaps
        .find({ _id: { $in: ids } })
		.project<Beatmap>({ fetch_time: 0 })
        .toArray();

    for (const id of cached_beatmaps.map(m => m._id))
        id_set.delete(id);

    if (!id_set.size) return cached_beatmaps; // all cache hit
	
    // if cache miss, query osu api
    const uncached_beatmaps: Beatmap[] = [];
    const query_time = new Date();
    let error_occurred = false;

    {
        const result = await get_beatmaps_osu([...id_set]);
        error_occurred ||= !!result.errors;

        for (const map of result.beatmaps) {
			const { title, artist, covers } = map.beatmapset;
			const banner_url = covers["cover@2x"];
            const {
                id: _id,
				version: diff_name,
				difficulty_rating: sr,
				bpm,
				accuracy: od,
				drain: hp,
				hit_length: drain_time
            } = map;
            const info = {
				_id,
                title,
				diff_name,
				banner_url,
				artist,
				sr,
				bpm,
				od,
				hp,
				drain_time,
				fetch_time: query_time
            };

            uncached_beatmaps.push(info);
            id_set.delete(map.id);
        }
    }

    // update cache and combine both results
    await beatmaps.insertMany(uncached_beatmaps, { ordered: false });

    return [ ...cached_beatmaps, ...uncached_beatmaps ];
}