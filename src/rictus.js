const klasa = require('klasa');
const FeedStore = require('./lib/structures/FeedStore');
const SettingFeeds = require('./lib/settings/SettingFeeds');
const { config, token, data } = require('./config');

class Rictus extends klasa.Client {

	constructor(...args) {
		super(...args);
		this.data = data;
		this.feeds = new FeedStore(this);
		this.registerStore(this.feeds);
		this.registerPiece('feed', this.feeds);
	}

	async login(...args) {
		const ret = await super.login(...args);
		SettingFeeds.init(this);
		return ret;
	}

}

new Rictus(config).login(token);
