// FROM vnmc-designs/bot-db-schema/schema.puml

type PlayerId = number
type MapId = number
type MatchId = number



type Ranking = "top1" | "top2" | "top3" | "top4" | "top6" | "top8" | "top12" | "top16" | "top24" | "top32" | "top48" | "top64"

type Role = "host" | "cohost" | "designer" | "referee" | "mappooler" | "mapper" | "playtester" | "streamer" | "commentator" | "statistician" | "spreadsheeter" | "consultant" | "storyboarder" | "map_description_writer" | "lore_builder"

type Event = "registration" | "qual" | "ro64" | "ro32" | "ro16" | "qf" | "sf" | "f" | "gf"
type Schedule = {
	start: number
	end: number
}

export type Round = "qual" | "ro64" | "ro32" | "ro16" | "qf" | "sf" | "f" | "gf"
export type Category = "RC" | "HB" | "LN" | "SV" | "EX" | "TB"
type Index = "1" | "2" | "3" | "4" | "5" | "6" | "7"

export type Map = {
	id: MapId
	pattern: string
}
export type MapEntries = Record<Index, Map>
export type NonQualifierPool = Record<Category, MapEntries>

type Bracket = "losers" | "winners"
type Leg = "leg1" | "leg2"
type Match = {
	match_id?: MatchId
	player1_id: PlayerId
	player1_seed: number
	player1_score: number
	player2_id: PlayerId
	player2_seed: number
	player2_score: number
	match_time?: number
	referee?: PlayerId
}
type LegMatch = Record<Leg, Match[]>
type BracketMatch = Record<Bracket, Match[] | LegMatch>
type NoBracketMatch = Match[]

export type Tournament = {
	_id: number
	abbr: string
	year: number
	registration: PlayerId[]
	schedules: Partial<Record<Event, Schedule>>
	staff: Partial<Record<Role, PlayerId[]>>
	mappool: Partial<Record<Round, MapEntries | NonQualifierPool>>
	matches: Partial<Record<Round, MatchId[] | NoBracketMatch | BracketMatch>>
	standings: Partial<Record<Ranking, PlayerId[]>>
	qual_seeding_reveal: number
	top_cut: number
}



export type Beatmap = {
	_id: MapId
	title: string
	diff_name: string
	banner_url: string
	artist: string
	sr: number
	bpm: number
	od: number
	hp: number
	drain_time: number
}



export type User = {
	_id: PlayerId
	username: string
	rank: number
	country_flag: string
	fetch_time: Date
}



export type Session = {
	_id: number
	osu_id: PlayerId
	auth_time: Date
}



type ScoreObject = {
	accuracy: number
	score: number
	max_combo: number
	count_320: number
	count_300: number
	count_200: number
	count_100: number
	count_50: number
	count_miss: number
}
type ScoreList = Record<PlayerId, ScoreObject[]>

export type Score = {
	_id: Tournament["_id"]
	score_list: Record<MapId, ScoreList>
}



type TimeSlot = {
	from: number
	to: number
}

export type AvailableTimes = {
	_id: number
	time_slots: TimeSlot[]
}



export type MapLimit = {
	_id: number
	qual: number
} & {
	[K in Exclude<Round, "qual">]: Record<Exclude<Category, "TB">, number>
}