const fs = require("fs")


const fetch = require("node-fetch") //Required for .fetch() 


const prefix = "$"; //Creates a prefix $





module.exports = {
	name: 'pokemon',
	description: 'pokemon!',
	async execute(message) {

		  if (!message.content.toLowerCase().startsWith(prefix + "pokemon")) return;

    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'] // For A vs An

    let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  const pokemon1 =   await fetch('https://pokemondb.net/pokedex/all').then(res => res.text())

  const args = pokemon1.split("View Pokedex for #").slice(1) // gets all pokemon

  let pokeRand = args[[Math.floor(Math.random() * 1042)]] // Get's a random Pokemon

  let pokeNum = pokeRand.split(" ") //Pokemon number

  let pokeName1 = pokeRand.split("<") //Pokemon Name Part 1

  let pokeName = pokeName1[0].split(">").slice(1) //Pokemon Name Part 2

  let pokeType = pokeRand.split(" type-").slice(1) // Pokemon Type 1 part 1

  let pokeType0 = pokeType[0].split("\"") // Pokemon Type 1 Part 2 (cuts off the end of the [string? object? function? idk])

  let pokeType1 = pokeType0[0] //Converts pokeType0[0] to string 

  let pokeType002 = pokeRand.split(" type").slice(2)//Pokemon Type 2 step 1 (may return 'undefined')  
  

  if (message.content.toLowerCase().startsWith(prefix + "pokemon")) {    


    console.log(`\n\ncontrol: ${pokeName[0]}, ${pokeType1}`)








   if ((pokeRand.includes('-muted')) && (pokeType1 === 'electric' || pokeType1 === 'ice') && (pokeType002.length != 0))  { 
//Sv2 Special Pokemon, type 1 is a vowel & has a type 2
     
      let pokeNameS00 = pokeRand.split("-muted").slice(1) //Special Pokemon Name

      let pokeNameS0 = pokeNameS00[0].split("small") // Cuts the rest of the string

      let pokeNameS = pokeNameS0[0] // Converts pokeNameS0[0] to string 

      let pokeNameSl = (pokeName[0].toString().toLowerCase()) //pokeName to lowercase

      let pokeName00S = pokeNameS.split(" " || "-" ) //Gets the "Mega" or "Partner" or "form" of the Pokemon

      let pokeName00Sl = (pokeName00S[0].toString().toLowerCase()) //Mega(etc...) to lower case

              let pokeType02 = pokeType002[0].split(" href")//Pokemon Type 2 step 2

              let pokeType2 = pokeType02[0] // Converts pokeType02[0] to string   

     console.log(`\n\nSv2 ${pokeNameS}, artwork;${pokeNameSl}-${pokeName00Sl}, type1:${pokeType1}, type2:${pokeType2}`)
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName00S[0]} ${pokeName[0]}`
            .replace(/\">/g ,"")
            .replace(/<\//g ,""),
            description: `[${pokeNameS}](https://pokemondb.net/pokedex/${pokeName[0]}): an [${pokeType1}](https://pokemondb.net/type/${pokeType1}) & [${pokeType2}](https://pokemondb.net/type/${pokeType2}) pokémon!`
            .replace(/\">/g ,"")
            .replace(/<\//g ,"") 
            .replace(/\"/g ,"")
            .replace(/-/g ,"")    
            .replace(/%27/g ,"'") // For Farfetch'd
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://img.pokemondb.net;artwork;${pokeNameSl}-${pokeName00Sl}.jpg`
               .replace(/;/g ,"/")
               .replace(/\">/g ,"")
               .replace(/<\//g ,"")} 
    }})

   } else


   if (pokeRand.includes('-muted') && (pokeType1 === 'electric' || pokeType1 === 'ice') && (pokeType002.length === 0))  { 
//Sv1 Special Pokemon, type 1 is a vowel & does not have a type 2
     
      let pokeNameS00 = pokeRand.split("-muted").slice(1)

      let pokeNameS0 = pokeNameS00[0].split("small")

      let pokeNameS = pokeNameS0[0]  

      let pokeNameSl = (pokeName[0].toString().toLowerCase()) //pokeName to lowercase

      let pokeName00S = pokeNameS.split(" " || "-" ) //Gets the "Mega" or "Partner" or "form" of the Pokemon

      let pokeName00Sl = (pokeName00S[0].toString().toLowerCase()) //Mega(etc...) to lower case       


     console.log(`\n\nSv1 ${pokeNameS}, artwork;${pokeNameSl}-${pokeName00Sl}, type1:${pokeType1}, type2:${pokeType002}`)
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName00S[0]} ${pokeName[0]}`
            .replace(/\">/g ,"")
            .replace(/<\//g ,""),
            description: `[${pokeNameS}](https://pokemondb.net/pokedex/${pokeName[0]}): an [${pokeType1}](https://pokemondb.net/type/${pokeType1}) pokémon!`
            .replace(/\">/g ,"")
            .replace(/<\//g ,"")  
            .replace(/\"/g ,"")
            .replace(/-/g ,"") 
            .replace(/%27/g ,"'") // For Farfetch'd 
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://img.pokemondb.net;artwork;${pokeNameSl}-${pokeName00Sl}.jpg`
               .replace(/;/g ,"/")
               .replace(/\">/g ,"")
               .replace(/<\//g ,"")} 
    }})
    
   } else   


   if ((pokeRand.includes('-muted')) && (!pokeType1.startsWith(consonants)) && (pokeType002.length === 0) )  { 
//Sc1 Special Pokemon, type 1 is a consenant & does not have a type 2
     
      let pokeNameS00 = pokeRand.split("-muted").slice(1)

      let pokeNameS0 = pokeNameS00[0].split("small")

      let pokeNameS = pokeNameS0[0]

      let pokeNameSl = (pokeName[0].toString().toLowerCase()) //pokeName to lowercase

      let pokeName00S = pokeNameS.split(" " || "-" ) //Gets the "Mega" or "Partner" or "form" of the Pokemon

      let pokeName00Sl = (pokeName00S[0].toString().toLowerCase()) //Mega(etc...) to lower case    

     console.log(`\n\nSc1 ${pokeNameS}, artwork;${pokeNameSl}-${pokeName00Sl}, type1:${pokeType1}, type2:${pokeType002}` )
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName00S[0]} ${pokeName[0]}`
            .replace(/\">/g ,"")
            .replace(/<\//g ,""),
            description: `[${pokeNameS}](https://pokemondb.net/pokedex/${pokeName[0]}): a [${pokeType1}](https://pokemondb.net/type/${pokeType1}) pokémon!`
            .replace(/\">/g ,"")
            .replace(/<\//g ,"")  
            .replace(/\"/g ,"")
            .replace(/-/g ,"")  
            .replace(/%27/g ,"'") // For Farfetch'd       
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://img.pokemondb.net;artwork;${pokeNameSl}-${pokeName00Sl}.jpg`
               .replace(/;/g ,"/")
               .replace(/\">/g ,"")
               .replace(/<\//g ,"")} 
    }})
    
   } else

   if ((pokeRand.includes('-muted')) && (!pokeType1.startsWith(consonants)) && (pokeType002.length != 0) )  { 
//Sc2 Special Pokemon, type 1 is a consenant & has a type 2
     
      let pokeNameS00 = pokeRand.split("-muted").slice(1)

      let pokeNameS0 = pokeNameS00[0].split("small")

      let pokeNameS = pokeNameS0[0]

      let pokeNameSl = (pokeName[0].toString().toLowerCase()) //pokeName to lowercase

      let pokeName00S = pokeNameS.split(" " || "-" ) //Gets the "Mega" or "Partner" or "form" of the Pokemon

      let pokeName00Sl = (pokeName00S[0].toString().toLowerCase()) //Mega(etc...) to lower case


              let pokeType02 = pokeType002[0].split(" href=")//Pokemon Type 2 step 2

              let pokeType2 = pokeType02[0] // Converts pokeType02 to string   

     console.log(`\n\nSc2 name:${pokeNameS}, artwork;${pokeNameSl}-${pokeName00Sl}, type1:${pokeType1}, type2:${pokeType2}` )
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName00S[0]} ${pokeName[0]}`
            .replace(/\">/g ,"")
            .replace(/<\//g ,""),
            description: `[${pokeNameS}](https://pokemondb.net/pokedex/${pokeName[0]}): a [${pokeType1}](https://pokemondb.net/type/${pokeType1}) & [${pokeType2}](https://pokemondb.net/type/${pokeType2}) pokémon!`
            .replace(/\">/g ,"")
            .replace(/<\//g ,"")
            .replace(/\"/g ,"")
            .replace(/-/g ,"")  
            .replace(/%27/g ,"'")  // For Farfetch'd       
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://img.pokemondb.net;artwork;${pokeNameSl}-${pokeName00Sl}.jpg`
               .replace(/;/g ,"/")
               .replace(/\">/g ,"")
               .replace(/<\//g ,"")} 
    }})
    
   } else       



    if ((pokeType1 === 'electric' || pokeType1 === 'ice') && (pokeType002.length != 0)) { 
//Rv2 Pokemon type 1 starts with a vowel and pokemon has a 2nd type 

              let pokeType02 = pokeType002[0].split(" href=")//Pokemon Type 2 step 2

              let pokeType2 = pokeType02[0] // Converts pokeType02 to string    

      console.log(`\nRv2 ${pokeName[0]}, ${pokeType1}, ${pokeType2}`)
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName[0]}`,
            description: `[${pokeName[0]}](https://pokemondb.net/pokedex/${pokeName[0]}): an [${pokeType1}](https://pokemondb.net/type/${pokeType1}) & [${pokeType2}](https://pokemondb.net/type/${pokeType2}) pokémon!`
            .replace(/<\/a,<br,/g ,"")
            .replace(/\"/g ,"")
            .replace(/-/g ,"")
            .replace(/%27/g ,"'")  // For Farfetch'd
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeNum[0]}.png`
               .replace(/Tapu /g ,"Tapu-")} 
    }})

  } else 


    if ((pokeType1 === 'electric' || pokeType1 === 'ice') && (pokeType002.length === 0)) { 
//Rv1 Pokemon type 1 starts with a vowel and does not have a second type

      console.log(`\nRv1 ${pokeName[0]}, ${pokeType1}`)
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName[0]}`,
            description: `[${pokeName[0]}](https://pokemondb.net/pokedex/${pokeName[0]}): an [${pokeType1}](https://pokemondb.net/type/${pokeType1}) pokémon!`
            .replace(/<\/a,<br,/g ,"")
            .replace(/\"/g ,"")
            .replace(/-/g ,"")
            .replace(/%27/g ,"'")  // For Farfetch'd
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeNum[0]}.png`} 
    }})

  } else 

       
    if ((!pokeType1.startsWith(consonants)) && (pokeType002.length != 0)) { 
//Rc2 Pokemon type 1 starts with a consenant and has a 2nd type 

              let pokeType02 = pokeType002[0].split(" href=")//Pokemon Type 2 step 2

              let pokeType2 = pokeType02[0] // Converts pokeType02 to string    

      console.log(`\nRc2 ${pokeName[0]}, ${pokeType1}, ${pokeType2}`)
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName[0]}`,
            description: `[${pokeName[0]}](https://pokemondb.net/pokedex/${pokeName[0]}): a [${pokeType1}](https://pokemondb.net/type/${pokeType1}) & [${pokeType2}](https://pokemondb.net/type/${pokeType2}) pokémon!`
            .replace(/<\/a,<br,/g ,"")
            .replace(/\"/g ,"")
            .replace(/-/g ,"")
            .replace(/%27/g ,"'")  // For Farfetch'd
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeNum[0]}.png`
               .replace(/Mr./g ,"Mr-")
               .replace(/Tapu /g ,"Tapu-")} 
    }})

    } else 

       
    if ((!pokeType1.startsWith(consonants)) && (pokeType002.length === 0)) { 
//Rc1 Pokemon type 1 starts with a consanant and does not have a 2nd type

      console.log(`\nRc1 ${pokeName[0]}, ${pokeType1}`)
     message.channel.send({embed: {
            color: 0xB75AFF, //Purple
            title: `${message.member.displayName}, you caught a wild ${pokeName[0]}`,
            description: `[${pokeName[0]}](https://pokemondb.net/pokedex/${pokeName[0]}): a [${pokeType1}](https://pokemondb.net/type/${pokeType1}) pokémon!`
            .replace(/<\/a,<br,/g ,"")
            .replace(/\"/g ,"")
            .replace(/-/g ,"")
            .replace(/%27/g ,"'")  // For Farfetch'd
            .replace(/♀/g ,"-f") //For Nidoran female
            .replace(/♂/g ,"-m"), //For Nidoran male
            image: {
               url: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeNum[0]}.png`} 
    }})



  } else {

    if (pokeRand.includes('-muted')) {

console.log(`\n\nError: ${pokeRand}`)} 
//Wishiwashi , Basculin , Rockruff , Alolan Persian, Manectric, Darmanitan


}} else
          
        console.log(`error ${pokeName[0]}, ${pokeType1}, ${pokeType2}`)  
  if (message.content.toLowerCase().startsWith(prefix + "ksdjnalappaubbidll")) 
    return 
      }
	}