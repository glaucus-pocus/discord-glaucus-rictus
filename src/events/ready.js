const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'ready',
			enabled: true
		});
	}

	async run() {
		const { prefix } = this.client.config;
		this.client.user.setActivity(`${prefix[prefix.length - 1]}help`).catch(err => this.client.emit('log', err, 'error'));
	}

	/* eslint-disable no-empty-function */
	init() {}
	/* eslint-enable no-empty-function */

};
