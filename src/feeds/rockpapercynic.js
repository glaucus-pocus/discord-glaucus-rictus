const Feed = require('../lib/structures/Feed');

module.exports = class extends Feed {

	constructor(...args) {
		super(...args, {
			author: {
				name: 'Rock, Paper, Cynic',
				url: 'http://www.rockpapercynic.com',
				// eslint-disable-next-line camelcase
				icon_url: 'https://www.google.com/s2/favicons?domain=www.rockpapercynic.com'
			},
			url: 'http://rockpapercynic.tumblr.com/rss'
		});
	}

	parse(item) {
		const parsed = super.parse(item);
		parsed.image = { url: /<img[^>]*src="([^"]*)"/.exec(parsed.description)[1] };
		const description = /<p>(.*)<\/p>/.exec(parsed.description);
		if (description) {
			[, parsed.description] = description;
		}
		return parsed;
	}

};
