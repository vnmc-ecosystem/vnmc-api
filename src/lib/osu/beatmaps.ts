import { secrets } from "bun";
import { authenticate_api } from "./auth";
import type { Beatmap } from "./types";

const osu_api_url = await secrets.get({
	service: "vnmc-api",
	name: "osu-api-url"
});

if (!osu_api_url) throw new Error("osu! API URL is not set");



export async function get_beatmaps_osu(ids: number[]) {
    let result: Beatmap[] = [];
    const chunk_size = 50;
    let errors: Error[] = [];

    for (let i = 0; i < ids.length; i += chunk_size) {
        const chunk = ids.slice(i, i + chunk_size);
        const params = new URLSearchParams();
        for (const id of chunk)
            params.append("ids[]", id.toString());

        const access_token = await authenticate_api();
        const res = await fetch(osu_api_url + "/beatmaps?" + params.toString(), {
            headers: {
                "Authorization": "Bearer " + access_token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        const data = await res.json() as { beatmaps: Beatmap[] };

        if (res.ok) result = [...result, ...data.beatmaps];
        else {
            errors.push(new Error("Error occurred while fetching beatmaps", {
                cause: {
                    id: chunk,
                    res: data
                }
            }));
        }
    }
    return { beatmaps: result, errors: errors.length ? new AggregateError(errors) : null };
}