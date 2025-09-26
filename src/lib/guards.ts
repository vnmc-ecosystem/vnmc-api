import { Elysia, t } from 'elysia';
import { Year, Round, MapCode, Event, Id, Role } from "$lib/path_params";
import { common_responses } from "$lib/responses";

// * path params guards

export const year_guard = new Elysia()
	.guard({
		params: Year
	})
	.as("global");

export const round_guard = new Elysia()
	.guard({
		params: Round,
	})
	.as("global");

export const event_guard = new Elysia()
	.guard({
		params: Event
	})
	.as("global");

export const map_code_guard = new Elysia()
	.guard({
		params: MapCode
	})
	.as("global");

export const id_guard = new Elysia()
	.guard({
		params: Id
	})
	.as("global");

export const role_guard = new Elysia()
	.guard({
		params: Role
	})
	.as("global");



// * combined guards (this is really stupid pls support )

export const round_code_guard = new Elysia()
	.guard({
		params: t.Object({
			...Round.properties,
			...MapCode.properties
		})
	})
	.as("global");

export const id_role_guard = new Elysia()
	.guard({
		params: t.Object({
			...Id.properties,
			...Role.properties
		})
	})
	.as("global");



// * common exception responses guard

export const common_responses_guard = new Elysia()
	.guard({
		response: common_responses
	})
	.as("global");