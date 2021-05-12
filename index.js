const tmi = require('tmi.js');
const Discord = require("discord.js");
const config = require("./config.json");

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


const discord_client = new Discord.Client();

discord_client.login(config.DISCORD_BOT_TOKEN)
  .then((response) => {
    console.log(`I am connected to a Discord-Server and will push messages to ${config.DISCORD_CHANNEL}`);
  })
  .catch((error) => {
    console.log(error);
  });

twitch_client.on('message', onMessageHandler);


twitch_client.connect()
  .then((response) => {
    console.log(`I am connected to the Twicth-Channel ${config.TWITCH_CHANNEL}`);
  })
  .catch((error) => {
    console.log(error);
  });

function onMessageHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  discord_client.channels.cache.get(config.DISCORD_CHANNEL).send(`${context.username}: ${msg}`)

};
