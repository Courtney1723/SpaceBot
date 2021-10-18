const Discord = require("discord.js"); //Discord package

const client = new Discord.Client();

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		message.channel.send(`Pong! \n${client.ws.ping} ms`);
	},
};