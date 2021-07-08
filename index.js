const Discord = require('discord.js');
const fs = require('fs');

const emojiFile = fs.readFileSync('emoji.json');
const emojiJSON = emojiFile.toString();
const emoji = JSON.parse(emojiJSON);

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
        if (emoji.hasOwnProperty(elem)) ctx.lineReplyNoMention(emoji[elem]);
    });
});

client.login(discord_token);
