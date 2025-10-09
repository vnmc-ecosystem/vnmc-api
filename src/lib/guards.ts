import { Elysia, t } from 'elysia';
import { Year, Round, MapCode, Event, Id, Role } from "$lib/path_params";
import { common_responses } from "$lib/responses";

// * path params guards

export const year_guard = new Elysia()
	.guard({
		params: Year
	})
	.as("scoped");

export const round_guard = new Elysia()
	.guard({
		params: Round,
	})
	.as("scoped");

export const event_guard = new Elysia()
	.guard({
		params: Event
	})
	.as("scoped");

export const map_code_guard = new Elysia()
	.guard({
		params: MapCode
	})
	.as("scoped");

export const id_guard = new Elysia()
	.guard({
		params: Id
	})
	.as("scoped");

export const role_guard = new Elysia()
	.guard({
		params: Role
	})
	.as("scoped");



// * common exception responses guard

export const common_responses_guard = new Elysia()
	.guard({
		response: common_responses
	})
	.as("scoped");