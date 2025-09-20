import { t } from "elysia";

export const MapId = t.Object({
	map_id: t.Number()
});

export const Time = t.Object({
	time: t.Number()
});

export const RefId = t.Object({
	ref_id: t.Number()
});

export const NewTournament = t.Object({
	abbr: t.String(),
	top_cut: t.Number({ error: "Top cut must be a number" }),
});