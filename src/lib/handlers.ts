import { Elysia } from "elysia";
import {
	AlreadyExistsError,
	InternalServerError
} from "$lib/responses";

export const error_handler = new Elysia()
	.onError(({ code, error, set }) => {
		switch (code) {
			case "VALIDATION":
				set.status = 400;
				return { message: error.message };
			case "UNKNOWN":
				set.status = 500;
				return { message: new InternalServerError().message };
			case "INTERNAL_SERVER_ERROR":
				set.status = 409;
				return { message: new AlreadyExistsError().message };
		}
	})
	.as("global")