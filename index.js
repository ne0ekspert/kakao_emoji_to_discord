const Discord = require('discord.js');
const fs = require('fs');
const tempy = require('tempy');
const got = require('got');
const FileType = require('file-type');

const emojiFile = fs.readFileSync('emoji.json');
const emojiJSON = emojiFile.toString();
const emoji = JSON.parse(emojiJSON);

const { discord_token } = require('./config.json');

require('discord-reply'); // Required for lineReply and lineReplyNoMention
const client = new Discord.Client();

client.once('ready', () => {
    console.log("준비 완료");
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "사용 방법은 멘션으로!",
            type: "PLAYING"
        }
    });
});

client.on('message', async (ctx) => {
    if (ctx.author.bot) return;
    const words = ctx.content.split(' ');

    if (ctx.mentions.has(client.user))
        ctx.lineReply("https://ne0ekspert.n-e.kr/info/discord_bot 여기 있음");

    words.forEach(elem => {
        if (emoji.hasOwnProperty(elem)) {
            var stream = got.stream(emoji[elem]);
            var attachment = new Discord.MessageAttachment(emoji[elem], `emoji.${FileType.fromStream(stream)}`);
            ctx.lineReplyNoMention(attachment);
        }
    });
});

client.login(discord_token);
