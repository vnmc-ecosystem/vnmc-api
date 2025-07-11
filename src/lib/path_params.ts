import { t } from "elysia";

export const Year = t.Object({
	year: t.Number()
});

export const Round = t.Object({
	round: t.UnionEnum([
		"qual",
		"ro32",
		"ro16",
		"qf",
		"sf",
		"f",
		"gf"
	])	
});

export const Event = t.Object({
	event: t.UnionEnum([
		"registration",
		"qual",
		"ro32",
		"ro16",
		"qf",
		"sf",
		"f",
		"gf"
	])
});

export const MapCode = t.Object({
	code: t.RegExp("^(?:[1-5]|(?:RC[1-7]|LN[1-4]|HB[1-3]|SV[1-2])|TB)$")
});

export const Id = t.Object({
	id: t.String()
});

export const Role = t.Object({
	role: t.String()
});