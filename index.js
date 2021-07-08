const Discord = require('discord.js');

const { discord_token } = require('./config.json');

require('discord-reply');
const client = new Discord.Client();

client.once('ready', () => {
    console.log("준비 완료");
});

client.on('message', async (ctx) => {
    if (ctx.author.bot) return;
    const words = ctx.content.split(' ');

    words.forEach(elem => {
        if (words[0] === "test") ctx.lineReplyNoMention("Test");
    });
});

client.login(discord_token);
