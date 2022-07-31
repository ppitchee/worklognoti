const cron = require('node-cron');
const config = require("./config.json");

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', async () => {
    // const channel = client.channels.cache.get('992022679672586280'); // test
    const channel = client.channels.cache.get('931042490553868298'); // mwe
    try {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);
        if (!webhook) {
            return console.log('No webhook was found that I can use!');
        }

        // await cron.schedule('* * * * *', () => {
        await cron.schedule('45 17 * * Mon-Fri', () => {
            webhook.send(`🚨🚨🚨 Log Work Time (8h) <@&856849758006149130> 🚨🚨🚨`, {
                username: 'worklog noti',
                avatarURL: 'https://play-lh.googleusercontent.com/7TygU-GEGtluUKkAIToWbGZJi2e7b-8zJhyimK9KhLegLGpG9N-BGQO3bcvcgdeNx6k=w240-h480-rw',
            });
        });

    } catch (error) {
        console.error('Error trying to send a message: ', error);
    }
});

const prefix = "!";

client.on("messageCreate", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }else if (command === "test") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Test!!!!! message had a latency of ${timeTaken}ms.`);
  }
});


client.login(config.BOT_TOKEN);