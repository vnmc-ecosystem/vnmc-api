import { Elysia } from 'elysia';
import { error_handler } from "$lib/handlers";
import {
	year_guard,
	common_responses_guard
} from "$lib/guards";
import { NewTournament } from '$lib/req_bodies';
import { TournamentAdd } from '$lib/responses';

export const tournament = new Elysia({ prefix: '/tournament' })
	.use(error_handler)
	.use(common_responses_guard)
	.use(year_guard)
	.post(
		"/:year",
		({ params: { year }, body: { abbr, top_cut }, status }) => {
			return status(201, {
				abbr,
				year
			});
		},
		{
			response: {
				201: TournamentAdd
			},
			body: NewTournament
		}
	)