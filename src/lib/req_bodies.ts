import { t } from "elysia";

export const MapId = t.Object({
	map_id: t.String()
});

export const Time = t.Object({
	time: t.Number()
});

export const RefId = t.Object({
	ref_id: t.String()
});

export const TopCut = t.Object({
	top_cut: t.Number()
});