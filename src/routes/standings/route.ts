import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import { common_responses_guard } from "$lib/guards";
import { Standings } from "$lib/responses";

export const standings = new Elysia({ prefix: "/standings" })
	.use(error_handler)
	.use(common_responses_guard)
	.get(
		"/",
		() => {
			return {
				abbr: "VNMC",
				year: 2023,
				standings: {
					top1: [{
						username: "Player1",
						url: "https://example.com/player1"
					}]
				}
			};
		},
		{
			response: {
				200: Standings
			}
		}
	)