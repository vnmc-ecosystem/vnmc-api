import { Elysia } from "elysia";
import { map } from "./routes/map/route.ts";

const app = new Elysia()
	.use(map)
	.listen(8000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);