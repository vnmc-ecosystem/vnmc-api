import { t } from "elysia";

export const MapId = t.Object({
	map_id: t.Number({ minimum: 1, error: "Map ID must be greater than 0" })
});

export const Time = t.Object({
	time: t.Number({ minimum: 0, error: "Time must be later than Jan 1, 1970" })
});

export const RefId = t.Object({
	ref_id: t.Number({ minimum: 1, error: "Referee ID must be greater than 0" })
});

export const NewTournament = t.Object({
	abbr: t.String({ maxLength: 10, error: "Abbreviation must be less than 10 characters long" }), // prevent injections
	top_cut: t.Number({ minimum: 2, error: "Top cut must be a number and greater than 2" })
});