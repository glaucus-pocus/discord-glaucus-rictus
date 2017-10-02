const Feed = require('../lib/structures/Feed');

module.exports = class extends Feed {

	constructor(...args) {
		super(...args, {
			enabled: true,
			author: {
				name: 'CommitStrip',
				url: 'http://www.commitstrip.com/',
				// eslint-disable-next-line camelcase
				icon_url: 'http://www.commitstrip.com/wp-content/themes/krds_blog/favicon.png?v=5'
			},
			url: 'http://www.commitstrip.com/en/feed/'
		});
	}

	parse(item) {
		const parsed = super.parse(item);
		parsed.image = { url: /<img[^>]*src="([^"]*)"/.exec(item['content:encoded'])[1] };
		return parsed;
	}

};
