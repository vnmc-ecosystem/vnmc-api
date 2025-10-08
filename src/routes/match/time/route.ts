import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	id_guard,
	common_responses_guard
} from "$lib/guards";
import { Time } from "$lib/req_bodies";
import {
	MatchTimeUpdate
} from "$lib/responses";

export const time = new Elysia()
	.use(error_handler)
	.use(common_responses_guard)
	.use(id_guard)
	.put(
		"/time",
		({ params: { id }, body: { time } }) => {
			return {
				match_id: id,
				time: 12341234900,
			};
		},
		{
			response: {
				200: MatchTimeUpdate
			},
			body: Time
		}
	)