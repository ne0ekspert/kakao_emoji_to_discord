const Discord = require('discord.js');
const fs = require('fs');
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
client.once('reconnecting', () => {
    console.log("재연결중...");
});
client.once('disconnect', () => {
    console.log("연결 해제됨");
});

client.on('message', async (ctx) => {
    if (ctx.author.bot) return;
    const words = ctx.content.split(' ');

    words.forEach(async (elem) => {
        if (emoji.hasOwnProperty(elem)) {
            var attachment = new Discord.MessageAttachment(emoji[elem]['url'], `emoji.${emoji[elem]['ext']}`);
            ctx.lineReplyNoMention(attachment);
        } // end if
    }); // end forEach
}); // end client.on

client.login(discord_token);
