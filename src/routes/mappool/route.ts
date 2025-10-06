import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	round_guard,
	common_responses_guard
} from "$lib/guards";
import {
	Mappool,
	MappoolMutation
} from "$lib/responses";

export const mappool = new Elysia({ prefix: "/mappool/:round" })
	.use(error_handler)
	.use(common_responses_guard)
	.use(round_guard)
	.get(
		"/",
		({ params: { round } }) => {
			return {
				abbr: "VNMC",
				year: 2023,
				round,
				mappool: [
					{
						code: "RC1",
						title: "Map Title",
						diff_name: "Diff Name",
						pattern: "speed",
						url: "https://example.com/map"
					}
				]
			};
		},
		{
			response: {
				200: Mappool
			}
		}
	)
	.post(
		"/",
		({ params: { round }, status }) => {
			return status(201, { round });
		},
		{
			response: {
				201: MappoolMutation
			}
		}
	)
	.delete(
		"/",
		({ params: { round } }) => {
			return { round };
		},
		{
			response: {
				200: MappoolMutation
			}
		}
	);