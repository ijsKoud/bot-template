import { config } from "dotenv";
config();

import Client from "./client/Client";

const owners = process.env.OWNERS?.split(" ") ?? [];

new Client({
	intents: ["GUILDS", "GUILD_MESSAGES"],
	partials: [],
	debug: !!process.env.DEBUG,
	activity: [
		{
			type: "LISTENING",
			name: "DaanGamesDG",
		},
	],
	owners,
}).start();
