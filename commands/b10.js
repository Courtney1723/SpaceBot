const {MessageButton} = require(`discord-buttons`)

const { Collector, MessageEmbed } = require('discord.js'); //required for embeds

module.exports = {
	name: 'b10',
	description: 'Buttons',
	async execute(message, args, client, button) {

    let button1 = new MessageButton()
      .setStyle('red')
      .setLabel('Dark Stalkers: The Night Warriors') 
      .setID('null1') 
      .setDisabled()

    let button2 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Breath of Fire') 
      .setID('null2') 
      .setDisabled()

    let button3 = new MessageButton()
      .setStyle('green')
      .setLabel('Sweet Home') 
      .setID('b10answer') 
      .setDisabled()

    let button4 = new MessageButton()
      .setStyle('grey')
      .setLabel('Final Fight') 
      .setID('null3')        
      .setDisabled()



    let button5 = new MessageButton()
      .setStyle('red')
      .setLabel('Dark Stalkers: The Night Warriors') 
      .setID('null1') 

    let button6 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Breath of Fire') 
      .setID('null2') 

    let button7 = new MessageButton()
      .setStyle('green')
      .setLabel('Sweet Home') 
      .setID('b10answer') 

    let button8 = new MessageButton()
      .setStyle('grey')
      .setLabel('Final Fight') 
      .setID('null3')       
  


    let embed1 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('Resident Evil 1 was inspired by what Capcom game?')
        .setDescription(`Final Bonus Round`)
        .setThumbnail(`https://imgur.com/YIelmVo.png`)
        

    let embed2 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('Resident Evil 1 was inspired by what Capcom game?')
        .setDescription(`Final Bonus Round`)
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

      await (message => message.button.id == 'b10answer')


      const filter = (button, user) => button.id === 'b10answer' && !user.bot;

      const collector = 
      message.createButtonCollector(filter, {max: 2, time: 60000 })


collector.on('collect', async (button, user, clicker, filter) => {

      let embedCongrats = new MessageEmbed()
        .setColor('#FFF000')
        .setDescription(`Congratulations <@${button.clicker.id}>! You have been awarded **6** points!`) 


   button.reply.defer()
 

       let embed3 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('Resident Evil 1 was inspired by what Capcom game?')
        .setDescription(`The Final Bonus Round is over!\nThanks for playing! \n> **Sweet Home** \nwas the correct answer
        `)
        .setThumbnail(`https://imgur.com/YIelmVo.png`)
        

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




