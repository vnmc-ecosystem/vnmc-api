import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	event_guard,
	common_responses_guard
} from "$lib/guards";
import { StartAndEndTime } from "$lib/req_bodies";
import {
	Schedule,
	ScheduleCreateUpdate,
	ScheduleDelete
} from "$lib/responses";

export const schedule = new Elysia({ prefix: "/schedule" })
	.use(error_handler)
	.use(common_responses_guard)
	.get(
		"/",
		() => {
			return {
				abbr: "VNMC",
				year: 2023,
				events: [
					{
						event_name: "Event 1",
						start_time: 12341234900,
						end_time: 12341234900
					}
				]
			};
		},
		{
			response: {
				200: Schedule
			}
		}
	)
	.use(event_guard)
	.post(
		"/:event",
		({ params: { event }, body: { start_time, end_time }, status }) => {
			return status(201, {
				abbr: "VNMC",
				year: 2023,
				event_name: event,
				start_time,
				end_time
			});
		},
		{
			response: {
				201: ScheduleCreateUpdate
			},
			body: StartAndEndTime
		}
	)
	.put(
		"/:event",
		({ params: { event }, body: { start_time, end_time } }) => {
			return {
				abbr: "VNMC",
				year: 2023,
				event_name: event,
				start_time,
				end_time
			};
		},
		{
			response: {
				200: ScheduleCreateUpdate
			},
			body: StartAndEndTime
		}
	)
	.delete(
		"/:event",
		({ params: { event } }) => {
			return {
				abbr: "VNMC",
				year: 2023,
				event_name: event
			};
		},
		{
			response: {
				200: ScheduleDelete
			}
		}
	);