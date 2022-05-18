const Discord = require("discord.js"); //Discord package
const fs = require("fs")

const client = new Discord.Client();

const prefix = "$"; //Creates a prefix $

module.exports = {
	name: 'editsay',
	description: 'editsay!',
	execute(message) {

  if (!message.content.startsWith(prefix + "editsay") || message.author.bot) return; 

	const args = message.content.slice(prefix.length).trim().split(/ +/);
  let msgID = args [1];    

    message.channel.messages.fetch(args[1])
    .then(message => {

        let saytext = args.slice(2).join(" ");  

        message.edit(saytext).catch(err => console.log(err));
    })
          message.delete();    
    }}