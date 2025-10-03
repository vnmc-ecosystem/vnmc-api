import { secrets } from "bun";
import { MongoClient } from "mongodb";
import type { Tournament, Beatmap, User, Session, Score, AvailableTimes, MapLimit } from "./types";

const mongodb_uri = await secrets.get({
	service: "vnmc-api",
	name: "mongodb-uri"
});

if (!mongodb_uri) throw new Error("MongoDB URI is not set");



const client = new MongoClient(mongodb_uri!);
await client.connect();

const db = client.db("vnmc");

const tournaments = db.collection<Tournament>("tournaments");
const beatmaps = db.collection<Beatmap>("beatmaps");
const users = db.collection<User>("users");
const sessions = db.collection<Session>("sessions");
const scores = db.collection<Score>("scores");
const available_times = db.collection<AvailableTimes>("available_times");
const map_limit = db.collection<MapLimit>("map_limit");

export { tournaments, beatmaps, users, sessions, scores, available_times, map_limit };