exports.init = (client) => {
	async function validate(resolver, feed) {
		const result = await client.argResolver.feed(feed);
		if (!result) throw 'The parameter <Feed> expects either a Feed Object.';
		return result.name;
	}

	const schema = {
		updated: {
			type: 'String',
			default: null,
			array: false
		}
	};

	client.settings.add('feeds', validate, schema);
};
