import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	id_guard,
	common_responses_guard
} from "$lib/guards";
import {
	Match
} from "$lib/responses";
import { ref } from "./ref/route";
import { time } from "./time/route";

export const match = new Elysia({ prefix: "/match/:id" })
	.use(error_handler)
	.use(common_responses_guard)
	.use(id_guard)
	.get(
		"/",
		({ params: { id } }) => {
			return {
				abbr: "VNMC",
				year: 2023,
				round: "1234",
				match_id: 1234,
				player_1_name: "1234",
				player_1_url: "1234",
				player_1_seed: 1234,
				player_1_score: 1234,
				player_2_name: "1234",
				player_2_url: "1234",
				player_2_seed: 1234,
				player_2_score: 1234,
				match_time: 1234123123,
				referee: "1234"
			};
		},
		{
			response: {
				200: Match
			}
		}
	)
	.use(ref)
	.use(time);