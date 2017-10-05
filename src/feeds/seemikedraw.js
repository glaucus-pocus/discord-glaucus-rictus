const Feed = require('../lib/structures/Feed');

module.exports = class extends Feed {

	constructor(...args) {
		super(...args, {
			author: {
				name: 'SeeMikeDraw',
				url: 'http://mikejacobsen.tumblr.com/',
				// eslint-disable-next-line camelcase
				icon_url: 'http://68.media.tumblr.com/avatar_83577644e2b7_128.png'
			},
			url: 'http://mikejacobsen.tumblr.com/rss'
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
