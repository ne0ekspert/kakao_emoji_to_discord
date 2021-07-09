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

client.on('message', async (ctx) => {
    if (ctx.author.bot) return;
    const words = ctx.content.split(' ');

    if (ctx.mentions.has(client.user))
        ctx.lineReply("https://ne0ekspert.n-e.kr/info/discord_bot 여기 있음");

    words.forEach(async (elem) => {
        if (emoji.hasOwnProperty(elem)) {
            var stream = got.stream(emoji[elem]);
            FileType.fromStream(stream)
            .then((ext) => {
                console.log(ext);
                var attachment = new Discord.MessageAttachment(emoji[elem], `emoji.${ext['ext']}`);
                ctx.lineReplyNoMention(attachment);
            }); // end.then
        } // endif
    }); // endforEach
}); // end.on

client.login(discord_token);
