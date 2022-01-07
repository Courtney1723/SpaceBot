const Discord = require("discord.js"); //Discord package
const fs = require("fs")

const client = new Discord.Client();

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		message.channel.send(`🏓 Pong! (${message.client.ws.ping} ms)`);
	},
};