const Discord = require("discord.js"); //Discord package
const fs = require("fs")

const client = new Discord.Client();

const prefix = "$"; //Creates a prefix $

module.exports = {
	name: 'embed',
	description: 'embed!',
	execute(message) {


      if (!message.content.startsWith(prefix + "embed") || message.author.bot) return;

    if (message.mentions.channels.size == 0) {
          message.reply("please mention a channel first.");
      }
      else {
          let targetChannel = message.mentions.channels.first();
          // Get the message to print

          const args = message.content.split(" ").slice(2);
          let saytext = args.join(" ");
          targetChannel.send({embed: {
            color: 0xB75AFF, //Purple
            description: (saytext),
          }});
          message.delete();
      }
  }}