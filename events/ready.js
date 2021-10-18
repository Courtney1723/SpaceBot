module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}! \nLet's get trippy!\n`);
	},
};