import { get_users_osu } from "$lib/osu/users";
import { users } from "./auth";
import type { User } from "./types";

export async function get_users_db(ids: number[]) {
	// query from cache
    if (!ids.length) return []; // no users

    const id_set = new Set(ids); // delete dups
    const cached_users = await users
        .find({ _id: { $in: ids } })
		.project<User>({ fetch_time: 0 })
        .toArray();

    for (const id of cached_users.map(m => m._id))
        id_set.delete(id);

    if (!id_set.size) return cached_users; // all cache hit
	
    // if cache miss, query osu api
    const uncached_users: User[] = [];
    const query_time = new Date();
    let error_occurred = false;

    {
        const result = await get_users_osu([...id_set]);
        error_occurred ||= !!result.errors;

        for (const user of result.users) {
            const {
                id: _id,
				username,
				rank,
				country_code
            } = user;
            const info = {
				_id,
                username,
				rank,
				country_flag: country_code,
				fetch_time: query_time
            };

            uncached_users.push(info);
            id_set.delete(user.id);
        }
    }

    // update cache and combine both results
    await users.insertMany(uncached_users, { ordered: false });

    return [ ...cached_users, ...uncached_users ];
}