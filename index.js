//The tmi dependency
const tmi = require('tmi.js');
//The Discord dependency
const Discord = require("discord.js");
// Loading the config.json
const config = require("./config.json");
//Creating a new Client with the tmi dependency
const twitch_client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: config.TWITCH_ACCOUNT,
    password: config.TWITCH_TOKEN
  },
  channels: [config.TWITCH_CHANNEL]
});
// Creating a Discord Client
const discord_client = new Discord.Client();
//Login of the Discord Client
discord_client.login(config.DISCORD_BOT_TOKEN)
  .then((response) => {
    console.log(`I am connected to a Discord-Server and will push messages to ${config.DISCORD_CHANNEL}`);
  })
  .catch((error) => {
    console.log(error);
  });
//Connecting the Twitch-Client to the Channel  
twitch_client.connect()
  .then((response) => {
    console.log(`I am connected to the Twicth-Channel ${config.TWITCH_CHANNEL}`);
  })
  .catch((error) => {
    console.log(error);
  });
//Defines the Function which is called by an Message Event
twitch_client.on('message', onMessageHandler);
//When a message is sent in the Twitch-Chat, it gets reposted in the defined Discord-Channel
function onMessageHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  discord_client.channels.cache.get(config.DISCORD_CHANNEL).send(`${context.username}: ${msg}`)
    .catch((error) => {
      console.log(error);
    })

};
