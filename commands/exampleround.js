const {MessageButton} = require(`discord-buttons`)
const { Collector, MessageEmbed } = require('discord.js'); //required for embeds

module.exports = {
	name: 'exampleround',
	description: 'Buttons',
	async execute(message, args, client, button) {

    // Part 1 - disabled buttons
    let button1 = new MessageButton()
      .setStyle('red')
      .setLabel('Epic Mickey') 
      .setID('null1') 
      .setDisabled()
    let button2 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Super Mario') 
      .setID('null2') 
      .setDisabled()
    let button3 = new MessageButton()
      .setStyle('green')
      .setLabel('Fallout') 
      .setID('exanswer') 
      .setDisabled()
    let button4 = new MessageButton()
      .setStyle('grey')
      .setLabel('Bioshock') 
      .setID('null3') 
      .setDisabled()

  //Part 2 - active buttons
    let button5 = new MessageButton()
      .setStyle('red')
      .setLabel('Epic Mickey') 
      .setID('null1') 
    let button6 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Super Mario') 
      .setID('null2') 
    let button7 = new MessageButton()
      .setStyle('green')
      .setLabel('Fallout') 
      .setID('exanswer') 
    let button8 = new MessageButton()
      .setStyle('grey')
      .setLabel('Bioshock') 
      .setID('null3')  

		//Part 3 - Round is over
    let embed1 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('Vault Boy is featured in what video game franchise?')
        .setDescription(`***Example Round***`)
        .setThumbnail(`https://imgur.com/I09vjs2.png`)
    let embed2 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('Vault Boy is featured in what video game franchise?')
        .setDescription(`***Example Round***`)
        .setThumbnail(`https://imgur.com/loGPYXn.png`) 

message.channel.send({
  buttons: [
    button1, button2, button3, button4
  ], //non-clickable buttons
  embed: embed1
}).then( async message =>
message.delete({timeout: 2000}).then( async message => // wait 10 seconds then send clickable buttons

message.channel.send({
  buttons: [
    button5, button6, button7, button8
  ], //clicakble buttons
  embed: embed2})).catch(err => console.log(err))
    .then((async function (message, button) {
      await (message => message.button.id == 'exanswer') //if the answer is right
      const filter = (button, user) => button.id === 'exanswer' && !user.bot; //looks for the right answer and ignores the bot response
      const collector = 
      message.createButtonCollector(filter, {max: 2, time: 1500 }) //60 seconds to answer, bot and one user answer are accepted

collector.on('collect', async (button, user, clicker, filter) => {
	let embedCongrats = new MessageEmbed()
		.setColor('#00FF00')
		.setDescription(`Congratulations <@${button.clicker.id}>! You have been awarded **3** points!`) //message sent after round is over, button.clicker is the first person to answer correctly
   button.reply.defer()
	let embed3 = new MessageEmbed()
		.setColor('#FFF000')
		.setTitle('Vault Boy is featured in what video game franchise?')
		.setDescription(`The example round is over!\n> **Fallout** \nwas the correct answer
		`)
		.setThumbnail(`https://imgur.com/I09vjs2.png`)

setTimeout(function() {button.message.edit({
  buttons: [
    button1, button2, button3, button4
  ],
  embed: embed3
    })}, 2000)

setTimeout(function() {button.channel.send({
  embed: embedCongrats
    })}, 3000);

    })}))).catch(err => console.log(err))}}
