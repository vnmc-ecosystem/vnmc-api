import { Elysia, t } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	id_guard,
	common_responses_guard
} from "$lib/guards";
import {
	Name,
	Sort,
	Limit
} from "$lib/query_params";
import {
	Player,
	PlayerRegistration,
	blank_response
} from "$lib/responses";

export const player = new Elysia({ prefix: "/player" })
	.use(error_handler)
	.use(common_responses_guard)
	.get(
		"/",
		() => {
			return {
				abbr: "VNMC",
				year: 2023,
				players: [
					{
						username: "Player1",
						url: "https://example.com/player1",
						rank: 1
					}
				]
			};
		},
		{
			response: {
				200: Player
			},
			query: t.Object({
				...Name.properties,
				...Sort.properties,
				...Limit.properties
			})
		}
	)
	.use(id_guard)
	.post(
		"/:id",
		({ params: { id }, status }) => {
			return status(201, {
				abbr: "VNMC",
				year: 2023,
				username: "New Player",
			});
		},
		{
			response: {
				201: PlayerRegistration
			}
		}
	)
	.delete(
		"/:id",
		({ params: { id }, status }) => {
			return status(204, "")
		},
		{
			response: {
				204: blank_response
			}
		}
	);