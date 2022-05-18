const fs = require("fs")

const fetch = require("node-fetch") //Required for .fetch() 

const prefix = "$"; //Creates a prefix $



module.exports = {
	name: 'rdo',
	description: 'rdo command',
	async execute(message, user) {

  if (!message.content.toLowerCase().startsWith(prefix + "rdo")) return;

  const rdo1 =   await fetch('https://www.ign.com/wikis/red-dead-redemption-2/Red_Dead_Online_Updates_Archive#Red_Dead_Redemption_2_Online_Updates').then(res => res.text())

  let args = rdo1.split("mw-headline").slice(2) // gets latest post

  let rdoDate = args[0].split(">") //Gets the Date

  let rdoTitles = args[2].split("<b>").slice(1).join("\n\n")//sections


  if (message.content.toLowerCase().startsWith(prefix + "rdo")) {

    message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${rdoDate[1]}`
            .replace(/Updates<\/span/g ," "),
            description: `${rdoTitles} \n[Click Here for more info](https://www.ign.com/wikis/red-dead-redemption-2/Red_Dead_Online_Updates_Archive)`
            .replace(/<\/b>/g ," ")
            .replace(/<\/li>/g ," ")
            .replace(/<li>/g ," ")
            .replace(/<br\/>/g ,"\n")
            .replace(/<\/ul>/g ," ")
            .replace(/<\/section>/g ,"\n\n ")
            .replace(/<section class="/g ," ")
            .replace(/jsx-/g ,"")
            .replace(/wiki-section wiki-html">/g ,"")
            .replace(/<h2>/g ,"")
            .replace(/<span class="/g ,"")
            }})}}}
          

