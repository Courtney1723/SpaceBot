const fs = require("fs")

const fetch = require("node-fetch") //Required for .fetch() 

const prefix = "$"; //Creates a prefix $



module.exports = {
	name: 'gta',
	description: 'gta command',
	async execute(message, user) {


    if (!message.content.toLowerCase().startsWith(prefix + 'gta')) return;

  const gta1 =   await fetch('https://www.reddit.com/r/gtaonline.json').then(res => res.text())

  let args = gta1.split("**Podium Vehicle**") //Gets the latest post

  let gtaBody = args[0].split("Thanks to")//Gets the latest post

  const aDate = new Date();

  let monthDate = aDate.toLocaleString('en-us', { month: 'long' });

  let yearDate = aDate.getFullYear();

  let dayDate = aDate.getDate();

  if (message.content.toLowerCase().startsWith(prefix + "gta")) {

        //message.channel.send({embed: {
            //color: 0xB75AFF, //Purple
            //title: `${monthDate} ${dayDate}, ${yearDate} - GTA Online Weekly Bonuses & Discounts:`,
           //description: 
    console.log(`**Podium Vehicle** - ${gtaBody[0]} \n[Click Here for more Info](https://www.ign.com/wikis/gta-5/GTA_Online_Weekly_Updates)`
            .replace(/&amp;#x200B;/g ,"_ _")
            .replace(/\\u00dc/g ,"Ü")//For the Übermacht
            .replace(/\\n\\n/g ," \n ") // proper spacing
            .replace(/\\\\- /g ," ")
            .replace(/&amp;/g ,"&")

        )    
            
    
            
            } else
  if (message.content.toLowerCase().startsWith(prefix + "ksdjnaidll")) 
    return 
      }}     