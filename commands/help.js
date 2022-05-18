const Discord = require("discord.js"); //Discord package
const fs = require("fs")

const client = new Discord.Client();

const prefix = "$"; //Creates a prefix $

module.exports = {
	name: 'help',
	description: 'Help!',
	execute(message) {

  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + "help")) {
    message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            description: ("**__SpaceBot Commands__**\n\n**$help**\n> provides a list of commands \n**$ping**\n> SpaceBot responds with pong! when online \n**$say #<channel-name> <message>**\n> SpaceBot will send a message in the specified channel\n**$editsay <messageID> <message>**\n> SpaceBot will edit the specified message \n**$embed #<channel-name> <message>**\n> SpaceBot will embed a message in the specified channel\n**$editembed <message ID> <message>**\n> SpaceBot will edit the specified embed\n**$code**\n> provides a link to this bot's base code \n**$rdo**\n> Provides the latest weekly RDO update\n**$gta**\n> Provides the latest GTA Online weekly update") 
      }})}
  }}

    