import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	round_guard,
	common_responses_guard
} from "$lib/guards";
import { Stats } from "$lib/responses";
import { time } from "./time/route";

export const stats = new Elysia({ prefix: "/stats" })
	.use(error_handler)
	.use(common_responses_guard)
	.use(time)
	.use(round_guard)
	.get(
		"/:round",
		({ params: { round } }) => {
			return {};
		},
		{
			response: {
				200: Stats
			}
		}
	);