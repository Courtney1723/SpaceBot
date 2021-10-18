const {MessageButton} = require(`discord-buttons`)

const { Collector, MessageEmbed } = require('discord.js'); //required for embeds

module.exports = {
	name: 'r32',
	description: 'Buttons',
	async execute(message, args, client, button) {

    let button1 = new MessageButton()
      .setStyle('red')
      .setLabel('Super Mario All-Stars') 
      .setID('null1') 
      .setDisabled()

    let button2 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Planet Alpha') 
      .setID('null2') 
      .setDisabled()

    let button3 = new MessageButton()
      .setStyle('green')
      .setLabel('Yoshi\'s Island') 
      .setID('r32answer') 
      .setDisabled()

    let button4 = new MessageButton()
      .setStyle('grey')
      .setLabel('Kirby\'s Adventure') 
      .setID('null3')                     
      .setDisabled()


    let button5 = new MessageButton()
      .setStyle('red')
      .setLabel('Super Mario All-Stars') 
      .setID('null1') 

    let button6 = new MessageButton()
      .setStyle('blurple')
      .setLabel('Planet Alpha') 
      .setID('null2') 

    let button7 = new MessageButton()
      .setStyle('green')
      .setLabel('Yoshi\'s Island') 
      .setID('r32answer') 

    let button8 = new MessageButton()
      .setStyle('grey')
      .setLabel('Kirby\'s Adventure') 
      .setID('null3')                  
    


    let embed1 = new MessageEmbed()
        .setColor('#B75AFF')
        .setDescription(`*Round 32*`)
        .setThumbnail(`https://imgur.com/PY9YJTl.png`)
        

    let embed2 = new MessageEmbed()
        .setColor('#00FFFF')
        .setDescription(`*Round 32*`)
        .setThumbnail(`https://imgur.com/PY9YJTl.png`)
                                                                                                                                                                                  
  

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

      await (message => message.button.id == 'r32answer')


      const filter = (button, user) => button.id === 'r32answer' && !user.bot;

      const collector = 
      message.createButtonCollector(filter, {max:1, time: 60000 })


collector.on('collect', async (button, user, clicker, filter) => {

      let embedCongrats = new MessageEmbed()
        .setColor('#00FF0F')
        .setDescription(`Congratulations <@${button.clicker.id}>! You have been awarded **2** points!`) 


   button.reply.defer()



       let embed3 = new MessageEmbed()
        .setColor('#00FF0F')
        .setTitle('Round 32 is over!')
        .setDescription(`<@${button.clicker.id}> won this round! \n> **Yoshi\'s Island** \nwas the correct answer
        `)
        .setThumbnail(`https://imgur.com/PY9YJTl.png`)

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



