import Client from "./client";
import {
	TextChannel,
	User,
	Collection,
	MessageAttachment,
	Role,
	GuildMember,
	Guild,
} from "discord.js";

export default class util {
	public constructor(private client: Client) {}
	public formatPerms(perms: string[]): string {
		if (!Array.isArray(perms) || perms.length === 0) return "`―`";

		const formattedPerms = perms.map(
			(str) =>
				`\`${str
					.replace(/_/g, " ")
					.replace(/GUILD/g, "SERVER")
					.toLowerCase()
					.replace(/\b(\w)/g, (char) => char.toUpperCase())}\``
		);

		return formattedPerms.length > 1
			? `\`${formattedPerms.slice(0, -1).join("`, `")}\` and \`${formattedPerms.slice(-1)[0]}\``
			: `\`${formattedPerms[0]}\``;
	}

	public getDate(date: number): string {
		return new Date(date).toLocaleString("en-GB", { timeZone: "UTC" });
	}

	public async getChannel(id: string): Promise<TextChannel> {
		return id
			? ((this.client.util.resolveChannel(id, this.client.channels.cache, false, true) ||
					(await this.client.channels.fetch(id).catch((e) => null))) as TextChannel)
			: null;
	}

	public async fetchUser(id: string): Promise<User> {
		return id
			? this.client.util.resolveUser(id, this.client.users.cache, false, false) ||
					(await this.client.users.fetch(id, true).catch((e) => null))
			: null;
	}

	public async fetchMember(id: string, guild: Guild): Promise<GuildMember> {
		return guild && id
			? this.client.util.resolveMember(id, guild.members.cache, false, false) ||
					(await guild.members.fetch(id).catch((e) => null))
			: null;
	}

	public async getRole(id: string, guild: Guild): Promise<Role> {
		return guild && id
			? this.client.util.resolveRole(id, guild.roles.cache, false, false) ||
					(await guild.roles.fetch(id).catch((e) => null))
			: null;
	}

	public trimArray(arr: Array<string>, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	public formatBytes(bytes: number) {
		if (bytes === 0) return "0 Bytes";
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	public getAttachments(attachments: Collection<string, MessageAttachment>) {
		const valid = /^.*(gif|png|jpg|jpeg|mp4|mp3|pdf|psd)$/g;

		return attachments
			.array()
			.filter((attachment) => valid.test(attachment.url))
			.map((attachment) => attachment.url);
	}
}
