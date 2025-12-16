import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	round_guard,
	common_responses_guard
} from "$lib/guards";
import {
	Matches,
	MatchesUpdate
} from "$lib/responses";

export const matches = new Elysia({ prefix: "/matches" })
	.use(error_handler)
	.use(common_responses_guard)
	.put(
		"/",
		() => {
			return { year: 2023 };
		},
		{
			response: {
				200: MatchesUpdate
			}
		}
	)
	.use(round_guard)
	.get(
		"/:round",
		({ params: { round } }) => {
			return {
				abbr: "VNMC",
				year: 2023,
				round,
				matches: [
					{
						match_id: 1234,
						player_1_name: "1234",
						player_1_url: "1234",
						player_1_seed: 1234,
						player_1_score: 1234,
						player_2_name: "1234",
						player_2_url: "1234",
						player_2_seed: 1234,
						player_2_score: 1234,
						match_time: 1234123123
					}
				]
			};
		},
		{
			response: {
				200: Matches
			}
		}
	);