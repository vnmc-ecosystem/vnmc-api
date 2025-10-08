import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	id_guard,
	common_responses_guard
} from "$lib/guards";
import { RefId } from "$lib/req_bodies";
import {
	MatchRefUpdate,
	MatchRefDelete
} from "$lib/responses";

export const ref = new Elysia()
	.use(error_handler)
	.use(common_responses_guard)
	.use(id_guard)
	.put(
		"/ref",
		({ params: { id }, body: { ref_id } }) => {
			return {
				match_id: id,
				referee: "abcd",
			};
		},
		{
			response: {
				200: MatchRefUpdate
			},
			body: RefId
		}
	)
	.delete(
		"/ref",
		({ params: { id } }) => {
			return { match_id: id };
		},
		{
			response: {
				200: MatchRefDelete
			}
		}
	);