import { t } from "elysia";

export const MapId = t.Object({
	map_id: t.Number({ minimum: 1, error: "Map ID must be greater than 0" })
}, { additionalProperties: true });

export const Time = t.Object({
	time: t.Number({ minimum: 0, error: "Time must be later than Jan 1, 1970" })
}, { additionalProperties: true });

export const StartAndEndTime = t.Object({
	start_time: t.Number({ minimum: 0, error: "Start time must be later than Jan 1, 1970" }),
	end_time: t.Number({ minimum: 0, error: "End time must be later than Jan 1, 1970" })
}, { additionalProperties: true });

export const RefId = t.Object({
	ref_id: t.Number({ minimum: 1, error: "Referee ID must be greater than 0" })
}, { additionalProperties: true });

export const NewTournament = t.Object({
	abbr: t.String({ maxLength: 10, error: "Abbreviation must be less than 10 characters long" }), // prevent injections
	top_cut: t.Number({ minimum: 2, error: "Top cut must be a number and a power of 2" }), // TODO: add power of 2 validation
}, { additionalProperties: true });