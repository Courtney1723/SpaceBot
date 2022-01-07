const {MessageButton} = require(`discord-buttons`)

const { Collector, MessageEmbed } = require('discord.js'); //required for embeds

module.exports = {
	name: 'b07',
	description: 'Buttons',
	async execute(message, args, client, button) {

    let button1 = new MessageButton()
      .setStyle('red')
      .setLabel('Super Mario Space') 
      .setID('null1') 
      .setDisabled()

    let button2 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Super Mario Up Your Arsenal') 
      .setID('null2') 
      .setDisabled()

    let button3 = new MessageButton()
      .setStyle('green')
      .setLabel('Super Mario Wii') 
      .setID('b07answer') 
      .setDisabled()

    let button4 = new MessageButton()
      .setStyle('grey')
      .setLabel('Super Mario Earth') 
      .setID('null3')     
      .setDisabled()



    let button5 = new MessageButton()
      .setStyle('red')
      .setLabel('Super Mario Space') 
      .setID('null1') 

    let button6 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Super Mario Up Your Arsenal') 
      .setID('null2') 

    let button7 = new MessageButton()
      .setStyle('green')
      .setLabel('Super Mario Wii') 
      .setID('b07answer') 

    let button8 = new MessageButton()
      .setStyle('grey')
      .setLabel('Super Mario Earth') 
      .setID('null3')    
  


    let embed1 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('What is Super Mario Galaxy called in South Korea?')
        .setDescription(`Bonus Round 7`)
        .setThumbnail(`https://imgur.com/NbpHEue.png`)
        

    let embed2 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('What is Super Mario Galaxy called in South Korea?')
        .setDescription(`Bonus Round 7`)
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

      await (message => message.button.id == 'b07answer')


      const filter = (button, user) => button.id === 'b07answer' && !user.bot;

      const collector = 
      message.createButtonCollector(filter, {max: 2, time: 60000 })


collector.on('collect', async (button, user, clicker, filter) => {

      let embedCongrats = new MessageEmbed()
        .setColor('#FFF000')
        .setDescription(`Congratulations <@${button.clicker.id}>! You have been awarded **3** points!`) 


   button.reply.defer()
 

       let embed3 = new MessageEmbed()
        .setColor('#FFF000')
        .setTitle('What is Super Mario Galaxy called in South Korea?')
        .setDescription(`Bonus Round 7 is over! \n> **Super Mario Wii** \nwas the correct answer
        `)
        .setThumbnail(`https://imgur.com/NbpHEue.png`)
        

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




