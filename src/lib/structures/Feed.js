const { Piece } = require('klasa');
const fetch = require('snekfetch');
const xml2js = require('xml2js-es6-promise');
const moment = require('moment');

class Feed {

	constructor(client, dir, file, options = {}) {
		this.client = client;
		this.dir = dir;
		this.file = file;
		this.name = options.name || file.slice(0, -3);
		this.type = 'feed';
		this.enabled = 'enabled' in options ? options.enabled : true;

		this.embed = {
			author: options.author || { name: this.name },
			color: options.color || 16777215
		};

		this.url = options.url || '';
		this.frequency = options.frequency || 86400000;
		this.lastUpdate = null;
	}

	async run() {
		const response = await this.fetch();
		this.send(response.rss.channel[0].item);
	}

	async fetch() {
		return fetch.get(this.url).then(res => res.body).then(xml2js);
	}

	parse(item) {
		return {
			title: item.title[0],
			url: item.link[0],
			description: item.description[0],
			timestamp: moment(item.pubDate[0]).format()
		};
	}

	get channels() {
		return this.client.guilds
			.filter(guild => guild.settings.channel && (guild.settings.subscribed || []).includes(this.name))
			.map(guild => guild.channels.get(guild.settings.channel));
	}

	async send(items) {
		let updated = this.lastUpdate;
		items = items.map(this.parse).filter(item => !updated || updated.isBefore(item.timestamp)).map(item => {
			if (!updated || updated.isBefore(item.timestamp)) {
				updated = moment(item.timestamp);
			}
			return Object.assign({}, this.embed, item);
		});
		if (updated !== this.lastUpdate) {
			this.lastUpdate = updated;
			this.client.settings.feeds.update(this.name, { updated: updated.format() }, this.client.data.home);
		}
		this.channels.map(channel => items.map(embed => channel.sendEmbed(embed).catch(console.error)));
	}

	async init() {
		await this.client.settings.feeds.ensureCreate(this.name);
		const { updated } = this.client.settings.feeds.get(this.name);
		if (updated) {
			this.lastUpdate = moment(updated);
		}
		this.run();
	}

	// Technically left for more than just documentation
	/* eslint-disable no-empty-function */
	async reload() {}
	unload() {}
	disable() {}
	enable() {}
	/* eslint-enable no-empty-function */

}

Piece.applyToClass(Feed);

module.exports = Feed;
