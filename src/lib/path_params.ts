import { t } from "elysia";

export const Year = t.Object({
	year: t.Number({ error: "Year must be a number" })
});

export const Round = t.Object({
	round: t.UnionEnum([
		"qual",
		"ro64",
		"ro32",
		"ro16",
		"qf",
		"sf",
		"f",
		"gf"
	], { error: "Unknown round name" })
});

export const Event = t.Object({
	event: t.UnionEnum([
		"registration",
		"qual",
		"ro64",
		"ro32",
		"ro16",
		"qf",
		"sf",
		"f",
		"gf"
	], { error: "Unknown event name" })
});

export const MapCode = t.Object({
	code: t.RegExp("^(?:[1-5]|(?:RC[1-7]|LN[1-4]|HB[1-3]|SV[1-2]|EX[1-2])|TB)$", { error: "Unknown map code" })
});

export const Id = t.Object({
	id: t.String()
});

export const Role = t.Object({
	role: t.UnionEnum([
		"host",
		"cohost",
		"designer",
		"referee",
		"mappooler",
		"mapper",
		"playtester",
		"streamer",
		"commentator",
		"statistician",
		"spreadsheeter",
		"consultant",
		"storyboarder",
		"map_description_writer",
		"lore_builder"
	], { error: "Unknown role" })
});