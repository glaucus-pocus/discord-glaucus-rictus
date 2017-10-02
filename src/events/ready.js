const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			name: 'ready',
			enabled: true
		});
	}

	async run() {
		this.client.user.setActivity(`${this.client.config.prefix}help`).catch(err => this.client.emit('log', err, 'error'));
	}

	/* eslint-disable no-empty-function */
	init() {}
	/* eslint-enable no-empty-function */

};
