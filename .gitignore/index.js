const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.token);

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

client.on('ready', () => {
	console.log("Music Bot is ready!");
});


client.on('message', message => {

	if(message.author.bot)
		return;
	
	if(message.content.toLowerCase().stratsWith("!play"))
	{
		let args = message.content.split(" ");
		let url = args[1];
		let VoiceChannel = message.guild.channels.find(channel => channel.id === '603549810397544474');
		if(VoiceChannel != null)
		{
			console.log(VoiceChannel.name + " was found and is a " + VoiceChannel.type + " channel.");
			VoiceChannel.join()
			.then(connection => {
				console.log("Bot joined the channel.");
				const stream = ytdl(url, { filter : 'audioonly' });
				const dispatcher = connection.playStream(stream, streamOptions);
				
				dispatcher.on('end', () => {
					VoiceChannel.leave();
				})
			})
			.catch();
		}
	}
});



