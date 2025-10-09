import { t } from "elysia";

export const Name = t.Object({
	name: t.Optional(t.String({ maxLength: 10, error: "Keyword must be less than 10 characters long" })) // prevent injections
}, { additionalProperties: true });

export const Sort = t.Object({
	sort: t.Optional(
		t.UnionEnum([
			"rank",
			"reg_time"
		], { error: "Unknown sort option" })
	)
}, { additionalProperties: true });

export const Limit = t.Object({
	limit: t.Optional(t.Integer({ minimum: 1, error: "Limit must be an integer and greater than 0" }))
}, { additionalProperties: true });