import { t } from "elysia";

export const Name = t.Object({
	name: t.Optional(t.String({ maxLength: 10 })) // prevent injections
});

export const Sort = t.Object({
	sort: t.Optional(
		t.UnionEnum([
			"rank",
			"reg_time"
		], { error: "Unknown sort option" })
	)
});

export const Limit = t.Object({
	limit: t.Optional(t.Integer({ minimum: 1, error: "Limit must be an integer and greater than 0" }))
});