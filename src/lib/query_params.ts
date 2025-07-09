import { t } from "elysia";

export const Name = t.Object({
	name: t.Optional(t.String())
});

export const Sort = t.Object({
	sort: t.Optional(
		t.UnionEnum([
			"rank",
			"reg_time"
		])
	)
});

export const Limit = t.Object({
	limit: t.Optional(t.Integer())
});