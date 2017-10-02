const Feed = require('../lib/structures/Feed');

module.exports = class extends Feed {

	constructor(...args) {
		super(...args, {
			enabled: true,
			author: {
				name: 'The Odd 1\'s Out',
				url: 'http://theodd1sout.com/'
			},
			url: 'http://theodd1sout.com/feed/'
		});
	}

	parse(item) {
		const parsed = super.parse(item);
		let description = /<img[^>]*src="([^"?]*)\??[^"]*"/.exec(parsed.description);
		if (description) {
			parsed.image = { url: description[1] };
		}
		description = /<\/p>\s*<p>(.*)<\/p>/.exec(parsed.description);
		if (description) {
			[, parsed.description] = description;
		} else {
			parsed.description = '';
		}
		return parsed;
	}

};
