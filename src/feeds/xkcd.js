const Feed = require('../lib/structures/Feed');

module.exports = class extends Feed {

	constructor(...args) {
		super(...args, {
			author: {
				name: 'xkcd',
				url: 'https://xkcd.com/',
				// eslint-disable-next-line camelcase
				icon_url: 'https://www.google.com/s2/favicons?domain=xkcd.com'
			},
			url: 'https://xkcd.com/rss.xml'
		});
	}

	parse(item) {
		const parsed = super.parse(item);
		parsed.image = { url: /<img[^>]*src="([^"]*)"/.exec(parsed.description)[1] };
		[, parsed.description] = /<img[^>]*title="([^"]*)"/.exec(parsed.description);
		return parsed;
	}

};
