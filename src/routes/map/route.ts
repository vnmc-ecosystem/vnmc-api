import { Elysia, t } from "elysia";
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

export const map = new Elysia({ prefix: "/map/:round/:code" })
	.use(error_handler)
	.use(common_responses_guard)
	.use(round_guard)
	.use(map_code_guard)
	.get(
		"/",
		({ params: { round, code } }) => {
			return {
				abbr: "VNMC",
				year: 2023,
				round,
				code: "RC1",
				map: {
					title: "Map Title",
					diff_name: "Diff Name",
					url: "https://example.com/map",
					banner_url: "https://example.com/banner",
					artist: "Map Artist",
					sr: 5.4,
					bpm: 180,
					od: 8,
					hp: 7,
					drain_time: 200,
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
		({ params: { round, code }, status }) => {
			return status(201, {
				round,
				code,
				map_id: 123,
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
		({ params: { round, code } }) => {
			return {
				round,
				code,
				map_id: 123,
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
		({ params: { round, code } }) => {
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