const Discord = require("discord.js"); //Discord package
const fs = require("fs")

const client = new Discord.Client();

const prefix = "$"; //Creates a prefix $

module.exports = {
	name: 'code',
	description: 'code!',
	execute(message) {

      if (message.content.toLowerCase().startsWith(prefix + "code")) {
    message.channel.send("<https://replit.com/@courtney1723/SpaceBot#index.js>")
      }}}

    