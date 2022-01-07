const {MessageButton} = require(`discord-buttons`)

const { Collector, MessageEmbed } = require('discord.js'); //required for embeds

module.exports = {
	name: 'b02',
	description: 'Buttons',
	async execute(message, args, client, button) {

    let button1 = new MessageButton()
      .setStyle('red')
      .setLabel('Bully') 
      .setID('null1') 
      .setDisabled()

    let button2 = new MessageButton()
      .setStyle('blurple')
      .setLabel('GTA V') 
      .setID('null2') 
      .setDisabled()

    let button3 = new MessageButton()
      .setStyle('green')
      .setLabel('Manhunt') 
      .setID('b02answer') 
      .setDisabled()

    let button4 = new MessageButton()
      .setStyle('grey')
      .setLabel('Max Payne 3') 
      .setID('null3')   
      .setDisabled()



    let button5 = new MessageButton()
      .setStyle('red')
      .setLabel('Bully') 
      .setID('null1') 

    let button6 = new MessageButton()
      .setStyle('blurple')
      .setLabel('GTA V') 
      .setID('null2') 

    let button7 = new MessageButton()
      .setStyle('green')
      .setLabel('Manhunt') 
      .setID('b02answer') 

    let button8 = new MessageButton()
      .setStyle('grey')
      .setLabel('Max Payne 3') 
      .setID('null3')  


    let embed1 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('What Rockstar game is illegal to own in New Zealand?')
        .setDescription(`Bonus Round 2`)
         .setThumbnail(`https://imgur.com/yeANmfW.png`)
         

    let embed2 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('What Rockstar game is illegal to own in New Zealand?')
        .setDescription(`Bonus Round 2`)
         .setThumbnail(`https://imgur.com/loGPYXn.png`)
                       

        
  

message.channel.send({
  buttons: [
    button1, button2, button3, button4
  ],
  embed: embed1
}).then( async message =>

message.delete({timeout: 10000}).then( async message =>

message.channel.send({
  buttons: [
    button5, button6, button7, button8
  ],
  embed: embed2})).catch(err => console.log(err))
     
    
    
    
    .then((async function (message, button) {

      await (message => message.button.id == 'b02answer')


      const filter = (button, user) => button.id === 'b02answer' && !user.bot;

      const collector = 
      message.createButtonCollector(filter, {max: 2, time: 60000 })


collector.on('collect', async (button, user, clicker, filter) => {

      let embedCongrats = new MessageEmbed()
        .setColor('#FFF000')
        .setDescription(`Congratulations <@${button.clicker.id}>! You have been awarded **3** points!`) 


   button.reply.defer()
 

       let embed3 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('What Rockstar game is illegal to own in New Zealand?')
        .setDescription(`Bonus Round 2 is over! \n> **Manhunt** \nwas the correct answer
        `)
        .setThumbnail(`https://imgur.com/yeANmfW.png`)
        .setFooter(`Manhunt is banned in Australia, Germany, New Zealand, and The United States`)

setTimeout(function() {button.message.edit({
  buttons: [
    button1, button2, button3, button4
  ],
  embed: embed3
    })}, 10000)

setTimeout(function() {button.channel.send({
  embed: embedCongrats
    })}, 12000)


    })}))).catch(err => console.log(err))}}