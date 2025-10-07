import { Elysia } from "elysia";
import { map } from "./routes/map/route.ts";
import { mappool } from "./routes/mappool/route.ts";
import { standings } from "./routes/standings/route.ts";
import { stats } from "./routes/stats/route.ts";
import { tournament } from "./routes/tournament/route.ts";

const app = new Elysia()
	.use(map)
	.use(mappool)
	.use(standings)
	.use(stats)
	.use(tournament)
	.listen(8000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);