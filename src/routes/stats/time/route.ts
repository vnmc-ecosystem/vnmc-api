import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import { common_responses_guard } from "$lib/guards";
import { Time } from "$lib/req_bodies";
import { StatsTimeUpdate } from "$lib/responses";

export const time = new Elysia()
	.use(error_handler)
	.use(common_responses_guard)
	.put(
		"/time",
		({ body: { time } }) => {
			return { time: 12341234900 };
		},
		{
			response: {
				200: StatsTimeUpdate
			},
			body: Time
		}
	)