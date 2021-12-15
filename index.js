const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
require("dotenv").config();
const ytdl = require("ytdl-core")

const token = process.env.TOEKN
const prefix = process.env.PREFIX

const client = new Discord.Client();


const Music = ['Youtube Link 1' , 'Youtube Link 2' , 'Youtube Link 3' , 'Youtube Link 4']


//---------- Ready Bot ---------------
client.on('ready', () => {
    console.log(`${client.user.tag} Logged In !`)
})

//------ Ping Command -------
client.on('message' , message => {
    if (message.content === `${prefix}ping`) {
        message.channel.send(`Ping : ${client.ws.ping}Ms`)
    }
})




//---------- Play Radio ---------------
client.on("ready", async () => {
    client.user.setPresence({
      status: 'dnd',
      activity: {
        name: `Radio | Observers Team`,
        type: 'LISTENING',
      }
    })
    let channel = await client.channels.cache.get('VOICE-ID')
    let connection  = await channel.join()
    async function play(connection) {
        const radio = ytdl(Music[Math.floor(Math.random() * Music.length)], { filter: "audioonly" })
        const dispatcher = connection.play(radio)
        dispatcher.on("finish",async () => {
          await play(connection)
        })
    }
    await play(connection)
    setInterval(async ()=>{
      if (connection.status !== 0){
        connection.disconnect()
        connection = await channel.join()
        await play(connection)
      }
      
    },1000 * 3)
        play(connection)
  })

client.login(token)
  

