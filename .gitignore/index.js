const { Client, Util } = require('discord.js');
const PREFIX = '!';
const ytdl = require('ytdl-core');
 
const client = new Client({ disableEveryone: true });
 
client.on('ready', () => console.log('Ready!'));
 
client.on('message', async msg => {
        if (msg.author.bot) return;
        if (!msg.content.startsWith('!')) return
        const args = msg.content.split(' ')
        let command = msg.content.toLowerCase().split(' ')[0]
        command = command.slice(PREFIX.length)
 
        if (command === 'play') {
                const voiceChannel = msg.member.voiceChannel;
                if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
                voiceChannel.join()
                        .then(connection => {
                                const dispatcher = connection.playStream(ytdl(args[1]))
                                console.log(dispatcher.time)
                        })
                        .catch(console.log)
        }
});
 
client.login(process.env.token);



