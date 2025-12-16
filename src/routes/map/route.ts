import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	round_guard,
	map_code_guard,
	common_responses_guard
} from "$lib/guards";
import { MapId } from "$lib/req_bodies";
import {
	Map,
	MapMutation,
	MapDeletion
} from "$lib/responses";
import { tournaments } from "$lib/db/auth";
import { generate_path, get_latest_tournament, get_map_limit } from "$lib/db/utils";
import { get_beatmaps_db } from "$lib/db/beatmaps";
import type { MapEntries, NonQualifierPool } from "$lib/db/types";

export const map = new Elysia({ prefix: "/map/:round/:code" })
	.use(error_handler)
	.use(common_responses_guard)
	.use(round_guard)
	.use(map_code_guard)
	.get(
		"/",
		async ({ params: { round, code }, status }) => {
			const path = generate_path(round, code);

			const res = (await tournaments.findOne({ _id: 6 }, {
				projection: { _id: 0, abbr: 1, year: 1, [path]: 1 },
				sort: { _id: -1 }
			}))!;
			const { mappool, abbr, year } = res;

			const round_object = mappool[round as keyof typeof mappool];
			if (!round_object) return status(404, { message: "Round not found" });

			if (Object.keys(round_object).length === 0 ||
			Object.keys((round_object as NonQualifierPool)[code.slice(0, 2) as keyof typeof round_object]).length === 0)
			return status(404, { message: "Map not found" }) // TODO: fix type this is so ass

			const map = round === "qual" ? 
				(round_object as MapEntries)[code as keyof MapEntries] :
				(round_object as NonQualifierPool)[code.slice(0, 2) as keyof NonQualifierPool][code === "TB" ? "1" : code.slice(2) as keyof MapEntries];
			const { id, pattern } = map;

			const map_detailed = (await get_beatmaps_db([id]))[0]!;
			const { _id, title, diff_name, banner_url, artist, sr, bpm, od, hp, drain_time } = map_detailed

			return {
				abbr,
				year,
				round,
				code,
				pattern,
				map: {
					title,
					diff_name,
					url: `https://osu.ppy.sh/beatmaps/${_id}`,
					banner_url,
					artist,
					sr,
					bpm,
					od,
					hp,
					drain_time
				}
			};
		},
		{
			response: {
				200: Map
			}
		}
	)
	.post(
		"/",
		async ({ params: { round, code }, body: { map_id }, status }) => {
			const path = generate_path(round, code);

			const latest_tournament = await get_latest_tournament();
			const { _id } = latest_tournament;

			const limit = await get_map_limit(_id, round, code);

			let map_index = -1;
			if (round === "qual") map_index = parseInt(code);
			else map_index = parseInt(code.slice(2));

			if (map_index > limit) return status(400, { message: "Map not permitted in this round" });

			const res = await tournaments.updateOne(
				{ _id, [path]: { $exists: false } },
				{ $set: { [path]: { id: map_id, pattern: "test" } } },
				{ sort: { _id: -1 } }
			);

			if (res.matchedCount === 0) return status(400, { message: "Map already exists" });
			return status(201, {
				round,
				code,
				map_id,
			});
		},
		{
			response: {
				201: MapMutation
			},
			body: MapId
		}
	)
	.put(
		"/",
		async ({ params: { round, code }, body: { map_id } }) => {
			const path = generate_path(round, code);

			const latest_tournament = await get_latest_tournament();
			const { _id } = latest_tournament;

			const res = await tournaments.updateOne(
				{ _id, [path]: { $exists: true } },
				{ $set: { [path]: { id: map_id, pattern: "updated" } } },
				{ sort: { _id: -1 } }
			);

			console.log(res.matchedCount)
			return {
				round,
				code,
				map_id,
			};
		},
		{
			response: {
				200: MapMutation
			},
			body: MapId
		}
	)
	.delete(
		"/",
		async ({ params: { round, code } }) => {
			const path = generate_path(round, code);		

			const latest_tournament = await get_latest_tournament();
			const { _id } = latest_tournament;

			const res = await tournaments.updateOne(
				{ _id, [path]: { $exists: true } },
				{ $unset: { [path]: "" } },
				{ sort: { _id: -1 } }
			);

			console.log(res.matchedCount)
			return {
				round,
				code
			};
		},
		{
			response: {
				200: MapDeletion
			}
		}
	);