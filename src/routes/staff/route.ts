import { Elysia } from "elysia";
import { error_handler } from "$lib/handlers";
import {
	role_guard,
	id_guard,
	common_responses_guard
} from "$lib/guards";
import {
	Staff,
	StaffCreateDelete,
	StaffUpdate
} from "$lib/responses";

export const staff = new Elysia({ prefix: "/staff" })
	.use(error_handler)
	.use(common_responses_guard)
	.use(role_guard)
	.get(
		"/:role",
		({ params: { role } }) => {
			return {
				abbr: "VNMC",
				year: 2023,
				staffs: {
					host: [
						{
							username: "admin1",
							url: "123",
							country_flag: "vn"
						}
					]
				}
			};
		},
		{
			response: {
				200: Staff
			}
		}
	)
	.use(id_guard)
	.post(
		"/:id/:role",
		({ params: { id, role }, status }) => {
			return status(201, {
				name: "New Staff",
				role
			});
		},
		{
			response: {
				201: StaffCreateDelete
			}
		}
	)
	.put(
		"/:id/:role",
		({ params: { id, role } }) => {
			return {
				name: "New Staff",
				old_role: role,
				new_role: role
			}
		},
		{
			response: {
				200: StaffUpdate
			}
		}
	)
	.delete(
		"/:id/:role",
		({ params: { id, role } }) => {
			return {
				name: "New Staff",
				role
			};
		},
		{
			response: {
				200: StaffCreateDelete
			}
		}
	);