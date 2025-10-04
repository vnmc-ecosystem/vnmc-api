export type AuthResponse = {
	access_token: string
    expires_in: number
    token_type: "Bearer"
}



type Beatmapset = {
    artist: string
	covers: {
		"cover@2x": string
	}
    title: string
}

export type Beatmap = {
    id: number

	// SR
    difficulty_rating: number

	// diff name
    version: string

	// OD
    accuracy: number

	// HP
    drain: number

	// drain time
    hit_length: number

    bpm: number
    beatmapset: Beatmapset
}



export type User = {
    id: number
    username: string
	rank: number
    country_code: string
}