//Scheduled task GTA https://www.npmjs.com/package/node-cron

var { MessageEmbed } = require('discord.js'); //required for embeds

var fetch = require("node-fetch") //Required for .fetch() 

const timezone = require("moment-timezone") // required for scheduled tasks 

module.exports = {
	name: 'gtaSchedule',
	async execute(client, cron, console) {

    
var cron = require('node-cron'); //required for scheduled tasks    
   
    


var task = cron.schedule(`20 * * * * *`, async(client) => { // UTC time (Saturday @ 1:02 PM Denver)
  


  const gta1 =   await fetch('https://www.ign.com/wikis/gta-5/GTA_Online_Weekly_Updates').then(res => res.text())

  let args = gta1.split("mw-headline") 

  let gtaBody = args[2].split("2022: ")//Gets the latest post

  let gtaTitle = args[2].split("\"header\\\"\\u003e")

  let gtaTitle1 = gtaTitle[1].split(":")

  let gtaBodyMain = gtaBody[1].split("u003e\\u003cli\\u003e\\u003cb\\u003e") //Gets the body of the post

  let gtaBodyMain1 = gtaBodyMain[1].split("Prime Gaming accounts by visiting")

  const aDate = new Date();

  let monthDate = aDate.toLocaleString('en-us', { month: 'long' });

  let yearDate = aDate.getFullYear();

  let dayDate = aDate.getDate();

  

  

console.log("GTA Scheduled Task Executed")
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_ADMIN).send({embed: {
            color: 0xB75AFF, //Purple
            title: `${monthDate} ${dayDate}, ${yearDate} - GTA Online Weekly Bonuses & Discounts:`,
            description: `**Last Updated ${gtaTitle1[0]}** \n\n${gtaBodyMain1[0]} by [clicking here](https://Twitch.amazon.com/Prime/Loot/GTAonline)`

      .replace(/\\u0026amp;/g, "&") // &
      .replace(/\\u0026#x2019;/g, "'") // '
      .replace(/\\u003c\/b\\u003e\\u003cbr\\u003e/g, "\n") // spacing
      .replace(/\\u003c\/li\\u003e\\n\\u003cli\\u003e\\u003cb\\u003e/g, "\n\n") //spacing
      .replace(/\\u003cbr\\u003e/g, "\n") //spacing
      .replace(/\\u003c\/b\\u003e/g, "") //spacing

    }});
  } , { 
   scheduled: false,
   timezone: "America/Denver"
 }); task.stop();
  }}

