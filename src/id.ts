import { Elysia, t } from "elysia";
import { Mappool, Map } from "$lib/responses";

const response = {
	200: t.String(),
	404: Map
}

const testmodel = t.Object({
	id_2: t.String()
});

const macro = new Elysia()
	.macro({
		log() {
			return {
				beforeHandle() {
					console.log('Request received!')
				}
			}
		}
	})
	.derive(() => {
		bruh: "wow"
	})

export const id = new Elysia({ prefix: "/test" })
	.decorate('test', 'wow')
	.use(macro)
	.guard(
		{
			params: t.Object({
				id: t.Number()
			}),
			body: testmodel
		}
	)
	.get(
		"/:id?",
		({ test, params: { id }, body, set, server, status }) => {
			return 'hehee'
		},
		{
			log: true,
			response
		}
	)