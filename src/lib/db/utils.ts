import type { Round, Category } from "./types";
import { tournaments, map_limit } from "./auth";

export function generate_path(round: Round, code: string) {
	let path = `mappool.${round}`;

	if (round === "qual") path += `.${code}`;
	else path += `.${code.slice(0, 2)}`;

	if (round !== "qual") {
		if (code === "TB") path += ".1";
		else path += `.${code.slice(2)}`;
	}

	return path;
}

export async function get_latest_tournament() {
	const res = (await tournaments.findOne({}, {
		projection: { _id: 1 },
		sort: { _id: -1 }
	}))!;

	return { _id: res._id };
}

export async function get_map_limit(_id: number, round: Round, code: string) {
	let limit = -1;
	let path = `${round}`;

	const category = code.slice(0, 2);
	if (round !== "qual") path += `.${category}`

	const res = (await map_limit.findOne(
		{ _id },
		{ projection: { _id: 0, [path]: 1 }}
	))!;

	if (round === "qual") limit = res.qual;
	else limit = res[round as Exclude<Round, "qual">][category as Exclude<Category, "TB">];

	return limit
}