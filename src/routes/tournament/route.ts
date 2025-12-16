import { Elysia } from 'elysia';
import { error_handler } from "$lib/handlers";
import {
	year_guard,
	common_responses_guard
} from "$lib/guards";
import { NewTournament } from '$lib/req_bodies';
import { TournamentAdd } from '$lib/responses';
import { tournaments } from '$lib/db/auth';

export const tournament = new Elysia({ prefix: '/tournament' })
	.use(error_handler)
	.use(common_responses_guard)
	.use(year_guard)
	.post(
		"/:year",
		async ({ params: { year }, body: { abbr, top_cut }, status }) => {
			await tournaments.insertOne({
				_id: 7,
				abbr,
				year,
				registration: [],
				schedules: {},
				staff: {},
				mappool: {},
				matches: {},
				standings: {},
				qual_seeding_reveal: 123123123123123,
				top_cut
			});

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