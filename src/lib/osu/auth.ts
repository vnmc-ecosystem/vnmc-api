import { secrets } from "bun";
import type { AuthResponse, User } from "./types";

let access_token: string | null = null;
let last_auth_time: number | null = null;
let refresh_duration: number | null = null;

const osu_client_id = await secrets.get({
	service: "vnmc-api",
	name: "osu-client-id"
});

const osu_client_secret = await secrets.get({
	service: "vnmc-api",
	name: "osu-client-secret"
});

const osu_auth_url = await secrets.get({
	service: "vnmc-api",
	name: "osu-auth-url"
});

const osu_token_url = await secrets.get({
	service: "vnmc-api",
	name: "osu-token-url"
});

const osu_api_url = await secrets.get({
	service: "vnmc-api",
	name: "osu-api-url"
});

if (!osu_client_id || !osu_client_secret || !osu_auth_url || !osu_token_url || !osu_api_url) throw new Error("Some credentials are not set");



export function get_auth_link() {
    const search_params = new URLSearchParams({
        client_id: osu_client_id!,
        response_type: "code",
        scope: "identify"
    });
    return `${osu_auth_url}?${search_params.toString()}`;
}

export async function get_self_data(token: string) {
    const res = await fetch(osu_api_url + "/me/mania", {
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    if (res.ok) return data as User;
    throw new Error("Failed to get own user data", { cause: data })
}

export async function authenticate_user(code: string) {
    const body = new URLSearchParams({
        client_id: osu_client_id!,
        client_secret: osu_client_secret!,
        code,
        grant_type: "authorization_code"
    });

    const res = await fetch(osu_token_url!, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
    });
    const data = await res.json() as AuthResponse;

    if (res.ok) return data;
    throw new Error("User authentication failed", { cause: data });
}

export async function authenticate_api() {
    // not authenticated, or token expired
    if (!access_token || Date.now() >= last_auth_time! + refresh_duration!) {
        last_auth_time = Date.now();

        const body = new URLSearchParams({
            client_id: osu_client_id!,
            client_secret: osu_client_secret!,
            grant_type: "client_credentials",
            scope: "public"
        });

        const res = await fetch(osu_token_url!, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body.toString()
        });
        const data = await res.json() as AuthResponse;

        if (res.ok) {
            access_token = data.access_token;
            refresh_duration = data.expires_in;
        }
        else throw new Error("Client authentication failed", { cause: data });
    }

    return access_token!
}