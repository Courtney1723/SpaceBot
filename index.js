const Discord = require("discord.js"); //Discord package
const keep_alive = require('./keep_alive.js'); //Keep Alive File in sidebar
const fs = require("fs")
const fetch = require("node-fetch") //Required for .fetch() 
const prefix = "$"; //Creates a prefix $
const { MessageEmbed } = require('discord.js'); //required for embeds
const cron = require("node-cron") //required for scheduled tasks
const timezone = require("moment-timezone")


const client = new Discord.Client();

require('discord-buttons')(client) // required for buttons 




client.login(process.env.DISCORD_TOKEN).catch(err => console.log(err))



//Bot rich presence
client.on("ready", () => {
    client.user.setPresence({
        activity: { 
            name: 'Trippy Commentaries',
            type: 'WATCHING'
        },
        status: 'idle'
    })
})


client.setMaxListeners(100); // prevents max listeners error





//Event Files

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}





// Command files

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});









//help command
client.on("message", (message) => {
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + "help")) {
    message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            description: ("**__TrippyBot Commands__**\n\n**$help**\n> provides a list of commands \n**$ping**\n> TrippyBot responds with pong! when online \n**$say #<channel-name> <message>**\n> TrippyBot will send a message in the specified channel\n**$editsay <messageID> <message>**\n> TrippyBot will edit the specified message \n**$embed #<channel-name> <message>**\n> TrippyBot will embed a message in the specified channel\n**$editembed <message ID> <message>**\n> TrippyBot will edit the embed of the specified message \n**$react<woweyes>|<_wow>|<_cheers>|<_yay>|<_excited> <message ID>**\n> TrippyBot will react to the specified message with a Nitro emoji\n**$code**\n> provides a link to this bot's base code \n**$TrippyClub**\n> provides a link to join The Trippy Club \n**$TrippyComms**\n> provides a link to Trippy Commentaries Youtube Channel\n**$Discord**\n> Provides an invite link to the Trippy Club Discord\n**$rdo**\n> Provides the latest weekly RDO update\n**$gta**\n> Provides the latest GTA Online weekly update") 
      }});
  } else
  if (message.content.toLowerCase().startsWith(prefix + "code")) {
    message.channel.send("https://replit.com/@courtney1723/TrippyBot#index.js");
  } else
  if (message.content.toLowerCase().startsWith(prefix + "trippyclub")) {
    message.channel.send("https://www.youtube.com/channel/UCVpgH_wZiJNZSsUwMOd1d8g/join");
  } else
  if (message.content.toLowerCase().startsWith(prefix + "trippycomms")) {
    message.channel.send("https://www.youtube.com/channel/UCVpgH_wZiJNZSsUwMOd1d8g");
  } else
  if (message.content.toLowerCase().startsWith(prefix + "discord")) {
    message.channel.send("https://www.youtube.com/post/UgwDaMUkSmcsj_Cv9bl4AaABCQ");
  }
});



// Say & Embed Commands
//______________________________________________________________________________________________


//Say command
client.on("message", (message) => {
  if (!message.content.toLowerCase().startsWith(prefix + "say") || message.author.bot) return;

    if (message.mentions.channels.size == 0) {
          message.reply("please mention a channel first.");
      }
      else {
          let targetChannel = message.mentions.channels.first();
          // Get the message to print

          const args = message.content.split(" ").slice(2);
          let saytext = args.join(" ");
          targetChannel.send(saytext).catch(err => console.log(err));
          message.delete();
      }
});








//edit say command 

client.on("message", (message) => {
  if (!message.content.startsWith(prefix + "editsay") || message.author.bot) return; 

	const args = message.content.slice(prefix.length).trim().split(/ +/);
  let msgID = args [1];    

    message.channel.messages.fetch(args[1])
    .then(message => {

        let saytext = args.slice(2).join(" ");  

        message.edit(saytext).catch(err => console.log(err));
    })
          message.delete();    
    });








//embed command
client.on("message", (message) => {
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
}); 


//edit embed command 

client.on("message", (message) => {
  if (!message.content.startsWith(prefix + "editembed") || message.author.bot) return; 

	const args = message.content.slice(prefix.length).trim().split(/ +/);
  let msgID = args [1];    

    message.channel.messages.fetch(args[1])
    .then(message => {

        let saytext = args.slice(2).join(" ");  

        message.edit({embed: {
            color: 0xB75AFF, //Purple
            description: (saytext)
          }}).catch(err => console.log(err));
    })
          message.delete();    
    });






//Delete Async Functions
// ________________________________________________________________________________________________







//Delete Links in x Channel 
client.on("message", async (message) => {
if (message.channel.id !== process.env.DISCORD_CHANNEL_ID_TRIPPY_CHAT_MAIN) return;

if (message.member.roles.cache.some(role => role.name === 'Trippy Mods')) {return}

if (message.content.toLowerCase().includes("/clip/"))
  {return
}else  
if (message.content.toLowerCase().includes("twitch.tv"))
  {message.channel.send(`Oops! Try again in <#820606747130462269> or check the <#821618855612514314> for a better place to post that link.`)
    message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`Deleted a message from ${message.author.tag}! \nContent: ${message.content}`));
}else
if (message.content.toLowerCase().includes("youtu.be"))
  {message.channel.send(`Oops! Try again in <#820606747130462269>, <#820604074331602974>, or check the <#821618855612514314> for a better place to post that video.`)
    message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`Deleted a message from ${message.author.tag}! \nContent: ${message.content}`));
}else
if (message.content.toLowerCase().includes("youtube.com"))
  {message.channel.send(`Oops! Try again in <#820606747130462269>, <#820604074331602974>, or check the <#821618855612514314> for a better place to post that video.`)
    message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`Deleted a message from ${message.author.tag}! \nContent: ${message.content}`));          
}else
if (message.content.toLowerCase().includes("instagram.com"))
  {message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`Deleted a message from ${message.author.tag}! \nContent: ${message.content}`));   
}else 
if (message.content.toLowerCase().includes("facebook.com"))
  {message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`Deleted a message from ${message.author.tag}! \nContent: ${message.content}`)); 
}else 
if (message.content.toLowerCase().includes("fb.watch"))
  {message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`Deleted a message from ${message.author.tag}! \nContent: ${message.content}`));     
}else 
if (message.content.toLowerCase().includes("tiktok.com"))
  {message.channel.send(`Oops! Try again in <#820606747130462269>, <#820604074331602974>, or check the <#821618855612514314> for a better place to post that link.`)
    message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`Deleted a message from ${message.author.tag}! \nContent: ${message.content}`)); 
}});












//Delete MP4 Links in x Channel


client.on('message', message => {

if (message.channel.id !== process.env.DISCORD_CHANNEL_ID_TRIPPY_CHAT_MAIN) return;  

if (message.member.roles.cache.some(role => role.name === 'Trippy Mods')) {
    return
}



var Attachment = (message.attachments)

const fileTypes = ['.mp4']; //leave the file types here

message.attachments.forEach(attachment => { //iterates over all attachments
  for (fileType of fileTypes) { //iterates over all the file types provided
    if (attachment.name.includes(fileType)) { //checks if the name of the attachment includes the file type

    message.channel.send(`Oops! Try again in <#820606747130462269>, <#820604074331602974>, or check the <#821618855612514314> for a better place to post that video.`)

    message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`<@${message.author.id}> posted a video! \n\n${message.content}`)) // if yes, deletes then sends log to channel
    
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send( Attachment.array()[0] )
    
    };
  };
})});







//Delete MOV Links in x Channel


client.on('message', message => {

if (message.channel.id !== process.env.DISCORD_CHANNEL_ID_TRIPPY_CHAT_MAIN) return;  

if (message.member.roles.cache.some(role => role.name === 'Trippy Mods')) {
    return
}



var Attachment = (message.attachments)

const fileTypes = ['.mov']; //leave the file types here

message.attachments.forEach(attachment => { //iterates over all attachments
  for (fileType of fileTypes) { //iterates over all the file types provided
    if (attachment.name.includes(fileType)) { //checks if the name of the attachment includes the file type

    message.channel.send(`Oops! Try again in <#820606747130462269>, <#820604074331602974>, or check the <#821618855612514314> for a better place to post that video.`)

    message.delete().then(
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send(`<@${message.author.id}> posted a video! \n\n${message.content}`)) // if yes, deletes
    
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_LOGS).send( Attachment.array()[0] )
    
    };
  };
})});














//Weekly GTA & RDO Online Bonuses
// ________________________________________________________________________________________________
 







//RDO command

client.on("message", async (message) => {
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const rdo1 =   await fetch('https://www.ign.com/wikis/red-dead-redemption-2/Red_Dead_Online_Updates_Archive').then(res => res.text())

  let args = rdo1.split("mw-headline").slice(2) // gets latest post

  let rdoDate = args[0].split(":") //Gets the Date

  let rdoTitles = args[0].split("<b>").slice(1).join("\n\n")//sections


  if (message.content.toLowerCase().startsWith(prefix + "rdo")) {

    message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${rdoDate[0].replace(/" data-transform="header">/g ,"")} - RDO Weekly Bonuses & Discounts:`,
            description: `\*\*${rdoTitles
            .replace(/<\/b>/g ," ")
            .replace(/<\/li><\/ul><\/section><section class="jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <ul><li>/g ," ")
            .replace(/<br\/>/g , "\n")
            .replace(/" href="\/wikis\/red-dead-redemption-2\//g ," ")
            .replace(/<a title="/g , " ")
            .replace(/<a class="new" title="/g , " ")
            .replace(/\(page does not exist\)/g , " ")
            .replace(/&#x27;/g , "'")
            .replace(/<\/a>/g , "") //Space before periods - leave alone
            .replace(/<a class="mw-redirect" title="/g , " ")
            .replace(/">/g , " ")
            .replace(/ <a rel="nofollow" class="external text\" href="/g ,": ")
            .replace(/ Twitch.amazon.com\/RDO. <\/li><\/ul><\/section><section class="jsx-1266389546 jsx-3897610314 jsx-1108734748 wiki-section wiki-html <h2><span class="/g , " ")
            .replace(/<\/li><\/ul><\/section><section class=\"jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <ul><li>/g , " ")



            .replace(/<\/li><\/ul><\/section><section class="jsx-1162077642 wiki-bobble <div class="jsx-1162077642 bobble-label advertisement<\/div><div class="jsx-2483022842 adunit-wrapper <div id="/g ,"\n") //Advertisement 1/2
            .replace(/" class="jsx-2483022842 bobble bobble-1 <\/div><\/div><\/section><section class="jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <ul><li>/g ," ") //Advertisement 2/2

            .replace(/<\/li><\/ul><\/section><section class=\"jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <h2><span class=\"/g , " ") // End ad

            .replace(/<\/li><\/ul><\/section><section class="jsx-226850652 wiki-bobble <div class="jsx-226850652 bobble-label advertisement<\/div><div class="jsx-2483022842 adunit-wrapper <div id="/ , " ") // Ad ? 


            .replace(/<\/li><\/ul><\/section><section class="jsx-/g ," ")
            .replace(/wiki-bobble <div class="jsx-/g ," ")
            .replace(/bobble-label advertisement<\/div><div class="/g ," ")
            .replace(/adunit-wrapper <div id="/g ," ")


            .replace(/<\/li><li>/g ," ")
            .replace(/\nTwitch.amazon.com\/RDO\n\n./g ," ")
            .replace(/ Twitch.amazon.com\/RDO./g ," ")


            .replace(/Fast Travel Fast_Travel /g ," ")
            .replace(/Treasure Maps Treasure_Maps Treasure Maps/g ,"Treasure Maps")
            .replace(/Treasure Map Treasure_Map Treasure Map /g ,"Treasure Map")
            .replace(/Outfits Outfits Outfits/g ,"Outfits")
            .replace(/Accessories Accessories Accessories/g ,"Accessories")
            .replace(/Trinkets Trinkets Trinkets/g ,"Trinkets")
            .replace(/Stagecoach Stagecoach Stagecoach/g ,"Stagecoach")
            .replace(/Tonics Tonics Tonics/g ,"Tonics")
            .replace(/Gold Bars Gold_Bars Gold Bars/g ,"Gold Bars")
            .replace(/Challenges Challenges Challenges/g ,"Challenges")
            .replace(/Collectibles Collectibles Collectibles/g ,"Collectibles")
            .replace(/Social Club/g ,"")

          //Clothing & Items
            .replace(/Saddles Saddles Saddles/g ,"Saddles")
            .replace(/Weapons Weapons Weapons/g ,"Weapons")
            .replace(/Items Items Items/g ,"Items")
            .replace(/Gloves Gloves Gloves/g ,"Gloves")
            .replace(/Hats Hats Hats/g ,"Hats")
            .replace(/Boots Boots Boots/g ,"Boots")
            .replace(/Chaps Chaps Chaps/g ,"Chaps")
            .replace(/Vests Vests Vests/g ,"Vests")
            .replace(/Shirts Shirts Shirts/g ,"Shirts")
            .replace(/Provisions Provisions Provisions/g ,"Provisions")
            .replace(/Hunter Hunter Hunter/g ,"Hunter")
            .replace(/Camera Camera Camera/g ,"Camera")
            .replace(/Spurs Spurs Spurs/g ,"Spurs")

          // Horses
            .replace(/Horses Horses Horses /g ,"Horses")
            .replace(/Turkoman Horses Turkoman_Horses Turkoman Horses/g ,"Turkoman Horses")
            .replace(/Turkoman Turkoman Turkoman/g ,"Turkoman")

          //Towns
            .replace(/Annesburg Annesburg Annesburg/g ,"Annesburg")
            .replace(/Armadillo Armadillo Armadillo/g ,"Armadillo")
            .replace(/Blackwater Blackwater Blackwater/g ,"Blackwater")
            .replace(/Colter Colter Colter/g ,"Colter")
            .replace(/Lagras Lagras Lagras/g ,"Lagras")
            .replace(/Rhodes Rhodes Rhodes/g ,"Rhodes")
            .replace(/Saint Denis Saint_Denis Saint Denis/g ,"Saint Denis")
            .replace(/Strawberry Strawberry Strawberry/g ,"Strawberry")
            .replace(/Tumbleweed Tumbleweed Tumbleweed/g ,"Tumbleweed")
            .replace(/Valentine Valentine Valentine/g ,"Valentine")

          //Gun Types
            .replace(/Repeaters Repeaters Repeaters/g ,"Repeaters")
            .replace(/Shotguns Shotguns Shotguns/g ,"Shotguns")
            .replace(/Pistols Pistols Pistols/g ,"Pistols")
            .replace(/Pistol   Pistol Pistol/g ,"Pistol")
            .replace(/Sniper Rifles Sniper_Rifles Sniper Rifles/g ,"Sniper Rifles")

          //Guns
            .replace(/Bolt-Action Rifle Bolt-Action Rifle Bolt-Action Rifle/g ,"Bolt-Action Rifle ")
            .replace(/Revolver Revolver Revolver/g ,"Revolver")
            .replace(/Lancaster Repeater Lancaster_Repeater Lancaster Repeater/g ,"Lancaster Repeater")
            .replace(/Carbine Repeater Carbine_Repeater Carbine Repeater/g ,"Carbine Repeater")
            .replace(/Litchfield Repeater Litchfield_Repeater Litchfield Repeater/g ,"Litchfield Repeater")
            .replace(/Rolling Block Rifle Rolling_Block_Rifle Rolling Block Rifle/g ,"Rolling Block Rifle")
            .replace(/Varmint Rifle Varmint_Rifle Varmint Rifle/g ,"Varmint Rifle")
            .replace(/Rifles Rifles Rifles/g ,"Rifles")
            .replace(/&amp;/g ,"&")
            
            .replace(/\n\n/g ,"\n\n\*\*")
            .replace(/:/g ,":\*\*")
            .replace(/\. \n/g ,".\*\* \n")
            .replace(/\.   \n\n/g ,".\*\* \n")
            .replace(/\.\*\* \n/g ,".\*\* \n\n")
            .replace(/\n\n\*\* \n\n\*\*/g ,"")         

            .replace(/https:\*\*/g ,"https:")
            .replace(/\*\*Twitch.amazon.com\/RDO \n\n\*\*./g ," ")} \n \n[Embedded Updates](https://www.ign.com/wikis/red-dead-redemption-2/Red_Dead_Online_Updates_Archive)`,
          }})
        
        }
          else
  if (message.content.toLowerCase().startsWith(prefix + "ksdjnaidll")) 
    return 
      });  







//GTA Command

client.on("message", async (message) => {
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const gta1 =   await fetch('https://www.reddit.com/user/BryonyBot/submitted.json').then(res => res.text())

  let args = gta1.split("\"selftext\": \"") //Gets the latest post

  let gtaBody = args[1].split("Update items")

  const aDate = new Date();

  let monthDate = aDate.toLocaleString('en-us', { month: 'long' });

  let yearDate = aDate.getFullYear();

  let dayDate = aDate.getDate();

  if (message.content.toLowerCase().startsWith(prefix + "gta")) {

        message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${monthDate} ${dayDate}, ${yearDate} - GTA Online Weekly Bonuses & Discounts:`,
            description: `${gtaBody[0]}`
            .replace(/\\u2197/g ,"_ _")
            .replace(/\\u00dc/g ,"Ü")
            .replace(/\\n\\n/g ,"\n")
            .replace(/\n\*\*/g ,"\n\n**")
            .replace(/\n\[Embedded/g ,"\n\n[Embedded")
            .replace(/\/\)\n\*/g ,")")

        }})}else
  if (message.content.toLowerCase().startsWith(prefix + "ksdjnaidll")) 
    return 
      });        











//Scheduled task GTA https://www.npmjs.com/package/node-cron


client.on("ready", async() => {

    const gta1 =   await fetch('https://www.reddit.com/user/BryonyBot/submitted.json').then(res => res.text())

  let args = gta1.split("\"selftext\": \"") //Gets the latest post

  let gtaBody = args[1].split("Update items")

  const aDate = new Date();

  let monthDate = aDate.toLocaleString('en-us', { month: 'long' });

  let yearDate = aDate.getFullYear();

  let dayDate = aDate.getDate();

  cron.schedule("00 00 18 * * Thursday", function(){ // UTC time (Thursdays @ 12PM Denver)

    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_RDO_DAILIES).send({embed: {
            color: 0xB75AFF, //Purple
            title: `${monthDate} ${dayDate}, ${yearDate} - GTA Online Weekly Bonuses & Discounts:`,
            description: `${gtaBody[0]}`
            .replace(/\\u2197/g ,"_ _")
            .replace(/\\u00dc/g ,"Ü")//For the Übermacht
            .replace(/\\n\\n/g ,"\n")
            .replace(/\n\*\*/g ,"\n\n**")
            .replace(/\n\[Embedded/g ,"\n\n[Embedded")
            .replace(/\/\)\n\*/g ,")")
            
    }})
  });
  });




//Scheduled task RDO https://www.npmjs.com/package/node-cron


client.on("ready", async() => {

  const rdo1 =   await fetch('https://www.ign.com/wikis/red-dead-redemption-2/Red_Dead_Online_Updates_Archive').then(res => res.text())

  let args = rdo1.split("mw-headline").slice(2) // gets latest post

  let rdoDate = args[0].split(":") //Gets the Date

  let rdoTitles = args[0].split("<b>").slice(1).join("\n\n")//sections

  cron.schedule("00 00 20 * * Tuesday", function(){ // UTC time (Tuesdays @ 2PM Denver)

    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_RDO_DAILIES).send({embed: {
            color: 0xB75AFF, //Purple
            title: `${rdoDate[0].replace(/" data-transform="header">/g ,"")} - RDO Weekly Bonuses & Discounts:`,
            description: `\*\*${rdoTitles
            .replace(/<\/b>/g ," ")
            .replace(/<\/li><\/ul><\/section><section class="jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <ul><li>/g ," ")
            .replace(/<br\/>/g , "\n")
            .replace(/" href="\/wikis\/red-dead-redemption-2\//g ," ")
            .replace(/<a title="/g , " ")
            .replace(/<a class="new" title="/g , " ")
            .replace(/\(page does not exist\)/g , " ")
            .replace(/&#x27;/g , "'")
            .replace(/<\/a>/g , "") //Space before periods - leave alone
            .replace(/<a class="mw-redirect" title="/g , " ")
            .replace(/">/g , " ")
            .replace(/ <a rel="nofollow" class="external text\" href="/g ,": ")
            .replace(/ Twitch.amazon.com\/RDO. <\/li><\/ul><\/section><section class="jsx-1266389546 jsx-3897610314 jsx-1108734748 wiki-section wiki-html <h2><span class="/g , " ")
            .replace(/<\/li><\/ul><\/section><section class=\"jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <ul><li>/g , " ")



            .replace(/<\/li><\/ul><\/section><section class="jsx-1162077642 wiki-bobble <div class="jsx-1162077642 bobble-label advertisement<\/div><div class="jsx-2483022842 adunit-wrapper <div id="/g ,"\n") //Advertisement 1/2
            .replace(/" class="jsx-2483022842 bobble bobble-1 <\/div><\/div><\/section><section class="jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <ul><li>/g ," ") //Advertisement 2/2

            .replace(/<\/li><\/ul><\/section><section class=\"jsx-1266389546 jsx-3089978689 jsx-2184991579 wiki-section wiki-html <h2><span class=\"/g , " ") // End ad

            .replace(/<\/li><\/ul><\/section><section class="jsx-226850652 wiki-bobble <div class="jsx-226850652 bobble-label advertisement<\/div><div class="jsx-2483022842 adunit-wrapper <div id="/ , " ") // Ad ? 


            .replace(/<\/li><\/ul><\/section><section class="jsx-/g ," ")
            .replace(/wiki-bobble <div class="jsx-/g ," ")
            .replace(/bobble-label advertisement<\/div><div class="/g ," ")
            .replace(/adunit-wrapper <div id="/g ," ")


            .replace(/<\/li><li>/g ," ")
            .replace(/\nTwitch.amazon.com\/RDO\n\n./g ," ")
            .replace(/ Twitch.amazon.com\/RDO./g ," ")


            .replace(/Fast Travel Fast_Travel /g ," ")
            .replace(/Treasure Maps Treasure_Maps Treasure Maps/g ,"Treasure Maps")
            .replace(/Treasure Map Treasure_Map Treasure Map /g ,"Treasure Map")
            .replace(/Outfits Outfits Outfits/g ,"Outfits")
            .replace(/Accessories Accessories Accessories/g ,"Accessories")
            .replace(/Trinkets Trinkets Trinkets/g ,"Trinkets")
            .replace(/Stagecoach Stagecoach Stagecoach/g ,"Stagecoach")
            .replace(/Tonics Tonics Tonics/g ,"Tonics")
            .replace(/Gold Bars Gold_Bars Gold Bars/g ,"Gold Bars")
            .replace(/Challenges Challenges Challenges/g ,"Challenges")
            .replace(/Collectibles Collectibles Collectibles/g ,"Collectibles")
            .replace(/Social Club/g ,"")

          //Clothing & Items
            .replace(/Saddles Saddles Saddles/g ,"Saddles")
            .replace(/Weapons Weapons Weapons/g ,"Weapons")
            .replace(/Items Items Items/g ,"Items")
            .replace(/Gloves Gloves Gloves/g ,"Gloves")
            .replace(/Hats Hats Hats/g ,"Hats")
            .replace(/Boots Boots Boots/g ,"Boots")
            .replace(/Chaps Chaps Chaps/g ,"Chaps")
            .replace(/Vests Vests Vests/g ,"Vests")
            .replace(/Shirts Shirts Shirts/g ,"Shirts")
            .replace(/Provisions Provisions Provisions/g ,"Provisions")
            .replace(/Hunter Hunter Hunter/g ,"Hunter")
            .replace(/Camera Camera Camera/g ,"Camera")
            .replace(/Spurs Spurs Spurs/g ,"Spurs")

          // Horses
            .replace(/Horses Horses Horses /g ,"Horses")
            .replace(/Turkoman Horses Turkoman_Horses Turkoman Horses/g ,"Turkoman Horses")
            .replace(/Turkoman Turkoman Turkoman/g ,"Turkoman")

          //Towns
            .replace(/Annesburg Annesburg Annesburg/g ,"Annesburg")
            .replace(/Armadillo Armadillo Armadillo/g ,"Armadillo")
            .replace(/Blackwater Blackwater Blackwater/g ,"Blackwater")
            .replace(/Colter Colter Colter/g ,"Colter")
            .replace(/Lagras Lagras Lagras/g ,"Lagras")
            .replace(/Rhodes Rhodes Rhodes/g ,"Rhodes")
            .replace(/Saint Denis Saint_Denis Saint Denis/g ,"Saint Denis")
            .replace(/Strawberry Strawberry Strawberry/g ,"Strawberry")
            .replace(/Tumbleweed Tumbleweed Tumbleweed/g ,"Tumbleweed")
            .replace(/Valentine Valentine Valentine/g ,"Valentine")

          //Gun Types
            .replace(/Repeaters Repeaters Repeaters/g ,"Repeaters")
            .replace(/Shotguns Shotguns Shotguns/g ,"Shotguns")
            .replace(/Pistols Pistols Pistols/g ,"Pistols")
            .replace(/Pistol   Pistol Pistol/g ,"Pistol")
            .replace(/Sniper Rifles Sniper_Rifles Sniper Rifles/g ,"Sniper Rifles")

          //Guns
            .replace(/Bolt-Action Rifle Bolt-Action Rifle Bolt-Action Rifle/g ,"Bolt-Action Rifle ")
            .replace(/Revolver Revolver Revolver/g ,"Revolver")
            .replace(/Lancaster Repeater Lancaster_Repeater Lancaster Repeater/g ,"Lancaster Repeater")
            .replace(/Carbine Repeater Carbine_Repeater Carbine Repeater/g ,"Carbine Repeater")
            .replace(/Litchfield Repeater Litchfield_Repeater Litchfield Repeater/g ,"Litchfield Repeater")
            .replace(/Rolling Block Rifle Rolling_Block_Rifle Rolling Block Rifle/g ,"Rolling Block Rifle")
            .replace(/Varmint Rifle Varmint_Rifle Varmint Rifle/g ,"Varmint Rifle")
            .replace(/Rifles Rifles Rifles/g ,"Rifles")
            .replace(/&amp;/g ,"&")
            
            .replace(/\n\n/g ,"\n\n\*\*")
            .replace(/:/g ,":\*\*")
            .replace(/\. \n/g ,".\*\* \n")
            .replace(/\.   \n\n/g ,".\*\* \n")
            .replace(/\.\*\* \n/g ,".\*\* \n\n")
            .replace(/\n\n\*\* \n\n\*\*/g ,"")         

            .replace(/https:\*\*/g ,"https:")
            .replace(/\*\*Twitch.amazon.com\/RDO \n\n\*\*./g ," ")} \n \n[Embedded Updates](https://www.ign.com/wikis/red-dead-redemption-2/Red_Dead_Online_Updates_Archive)`,
          }})
        
        })}); 




























//new subscriber test

client.on('channelUpdate', (oldChannel, newChannel) => {



  if (oldChannel.name !== newChannel.name) 

  if (oldChannel.id == client.channels.cache.get (process.env.DISCORD_CHANNEL_ID_SUBS) ) 

  if (newChannel.id == client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_SUBS) ) 

  
  client.channels.cache.get(process.env.DISCORD_CHANNEL_ID_TEST_ADMIN).send({embed: {
            color: 0xB75AFF, //Purple
            description: `Trippy now has __${newChannel.name}__ subscribers!`}})
            });
          

















































































"";