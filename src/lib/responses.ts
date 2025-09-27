import { t } from "elysia";

// * GET responses

export const Mappool = t.Object({
	abbr: t.String(),
	year: t.Number(),
	round: t.String(),
	mappool: t.Array(
		t.Object({
			code: t.String(),
			title: t.String(),
			diff_name: t.String(),
			pattern: t.String(),
			url: t.String()
		})
	)
});

export const Map = t.Object({
	abbr: t.String(),
	year: t.Number(),
	round: t.String(),
	code: t.String(),
	pattern: t.String(),
	map: t.Object({
		title: t.String(),
		diff_name: t.String(),
		url: t.String(),
		banner_url: t.String(),
		artist: t.String(),
		sr: t.Number(),
		bpm: t.Number(),
		od: t.Number(),
		hp: t.Number(),
		drain_time: t.Number()
	})
});

export const Schedule = t.Object({
	abbr: t.String(),
	year: t.Number(),
	events: t.Array(
		t.Object({
			event_name: t.String(),
			start_time: t.Number(),
			end_time: t.Number()
		})
	)
});

export const Standings = t.Object({
	abbr: t.String(),
	year: t.Number(),
	standings: t.Object({
		top1: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top2: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top3: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top4: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top6: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top8: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top12: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top16: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top24: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top32: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top48: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() }))),
		top64: 	t.Optional(t.Array(t.Object({ username: t.String(), url: t.String() })))
	})
});

export const Player = t.Object({
	abbr: t.String(),
	year: t.Number(),
	players: t.Array(
		t.Object({
			username: t.String(),
			url: t.String(),
			rank: t.Number(),
		})
	)
});

export const Staff = t.Object({
	abbr: t.String(),
	year: t.Number(),
	staffs: t.Object({
		host: 					t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		cohost: 				t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		designer: 				t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		referee: 				t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		mappooler: 				t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		mapper: 				t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		playtester: 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		streamer:	 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		commentator: 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		statistician: 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		spreadsheeter: 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		consultant: 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		storyboarder: 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		map_description_writer: t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() }))),
		lore_builder: 			t.Optional(t.Array(t.Object({ username: t.String(), url: t.String(), country_flag: t.String() })))
	})
});

export const Match = t.Object({
	abbr: t.String(),
	year: t.Number(),
	round: t.String(),
	match_id: t.Optional(t.Number()),
	player_1_name: t.String(),
	player_1_url: t.String(),
	player_1_seed: t.Number(),
	player_1_score: t.Number(),
	player_2_name: t.String(),
	player_2_url: t.String(),
	player_2_seed: t.Number(),
	player_2_score: t.Number(),
	match_time: t.Optional(t.Number()),
	referee: t.Optional(t.String())
});

export const Matches = t.Object({
	abbr: t.String(),
	year: t.Number(),
	round: t.String(),
	matches: t.Array(
		t.Pick(Match, [
			"match_id",
			"player_1_name",
			"player_1_url",
			"player_1_seed",
			"player_1_score",
			"player_2_name",
			"player_2_url",
			"player_2_seed",
			"player_2_score",
			"match_time"
		])
	)
});

export const Stats = t.Object({}); // ! TBA



// * POST/PUT/DELETE responses

export const TournamentAdd = t.Object({
	abbr: t.String(),
	year: t.Number()
});

export const MappoolMutation = t.Object({
	round: t.String()
});

export const MapMutation = t.Object({
	round: t.String(),
	code: t.String(),
	map_id: t.Number()
});

export const ScheduleCreateUpdate = t.Object({
	abbr: t.String(),
	year: t.Number(),
	event_name: t.String(),
	start_time: t.Number(),
	end_time: t.Number()
});

export const ScheduleDelete = t.Object({
	abbr: t.String(),
	year: t.Number(),
	event_name: t.String()
});

export const PlayerRegistration = t.Object({
	abbr: t.String(),
	year: t.Number(),
	username: t.String()
});

export const StaffCreateDelete = t.Object({
	name: t.String(),
	role: t.String()
});

export const StaffUpdate = t.Object({
	name: t.String(),
	old_role: t.String(),
	new_role: t.String()
});

export const MatchRefUpdate = t.Object({
	match_id: t.Number(),
	referee: t.String()
});

export const MatchRefDelete = t.Object({
	match_id: t.Number()
});

export const MatchTimeUpdate = t.Object({
	match_id: t.Number(),
	time: t.Number()
});

export const MatchesUpdate = t.Object({
	year: t.Number()
});

export const StatsTimeUpdate = t.Object({
	time: t.Number()
});



// * Exceptions

export const Exception = t.Object({
	message: t.String()
});

export const common_responses = {
	400: Exception,
	404: Exception,
	409: Exception,
	500: Exception
};

export class NotFoundError extends Error {
	constructor() {
		super("Resource Not Found");
	}
}

export class AlreadyExistsError extends Error {
	constructor() {
		super("Resource Already Exists");
	}
}

export class InternalServerError extends Error {
	constructor() {
		super("Server Error - Please Ping @SorA!");
	}
}



// * 204 response

export const blank_response = t.Literal("");