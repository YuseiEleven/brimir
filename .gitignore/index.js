const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const prefix = "!";
var PREFIX = "!";
const snekfetch = require('snekfetch');
const { get } = require("snekfetch");
var opus = require('opusscript');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const GOOGLE_API_KEY = (process.env.google);
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
const ce = require("embed-creator");
client.login(process.env.token);
const api = "http://mcapi.us/server/status?ip=califorcraft.eu";

// Lancement
client.on('ready', () => {
    console.log('Bot en ligne!');
    const voiceChannel = client.channels.get("564804751796076555");
      voiceChannel.join().then(connection => {
      console.log("Connecté.");
      });
});
client.on('message', message => {
    const voiceChannel = client.channels.get("564804751796076555");
    if (message.content === prefix + 'debug') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
        voiceChannel.leave()
        voiceChannel.join().then(connection => {
            console.log("Connecté.")});
        };
});
const activities_list = [
	"😺 !aide", 
	"🙀 !aide",
	"😿 !aide", 
	"🦄 !aide",
	"🐾 !aide",
	"🐈 !aide",
	"🐱 !aide",
	"😼 !aide",
	"😹 !aide",
	"😽 !aide"
	];
client.on('ready', () => {
	setInterval(() => {
			const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
			client.user.setActivity(activities_list[index]);
	}, 1000); //10 seconds=10000
});


// Messages d'informations
client.on('guildMemberAdd', member => {
    var role = member.guild.roles.find("name", "Invité");
    member.addRole(role)
    var channel = client.channels.get('564721727997870090');
    if (!channel) return;
    channel.send(ce(
      "#00FF00", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
      [{"name": "Passez un agréable moment en notre compagnie!", "value": member.user.tag }],
      {"text": "", "icon_url": member.guild.iconURL}, 
      {"thumbnail": member.user.displayAvatarURL}, true
    ));
  });
client.on('guildMemberRemove', member => {
    var channel = client.channels.get('564721727997870090');
    if (!channel) return;
    channel.send(ce(
      "#FF0000", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
      [{"name": "A bientôt!", "value": member.user.tag }],
      {"text": "", "icon_url": member.guild.iconURL}, 
      {"thumbnail": member.user.displayAvatarURL}, true
    ));
  });
client.on('guildBanAdd', (guild, user) => {
    var channel = client.channels.get('564721727997870090');
    if (!channel) return;
    channel.send(ce(
      "#010101", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
      [{"name": user.tag, "value": "est désormais banni." }],
      {"text": "", "icon_url": guild.iconURL}, 
      {"thumbnail": user.displayAvatarURL}, true
    ));
  });
client.on('guildBanRemove', (guild, user) => {
    var channel = client.channels.get('564721727997870090');
    if (!channel) return;
    channel.send(ce(
      "#EE82EE", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
      [{"name": user.tag, "value": "est autorisé à nous rejoindre de nouveau."}],
      {"text": "", "icon_url": guild.iconURL}, 
      {"thumbnail": user.displayAvatarURL}, true
    ));
});

//Modération
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(PREFIX) !== 0) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "supprimer") {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
      const deleteCount = parseInt(args[0], 10);
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 correspondant au nombre de messages à supprimer.");
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Impossible de supprimer les messages en raison de: ${error}`));
    };
  });
client.on("message", msg => {
    if (msg.guild === null) return;
    if (!msg.content.toLowerCase().startsWith(prefix)) return;
      msg.delete();
    if (msg.author.bot) return;
    if (msg.content.toLowerCase().startsWith(prefix + "kick ")) {
      if (!msg.member.hasPermission("KICK_MEMBERS")) return;
      var mem = msg.mentions.members.first();
      var mc = msg.content.split(" ")[2];
      if (!mem)
        return msg.reply('Veuillez mentionner un utilisateur. (!kick @test#1234)');
      if (!mc)
        return msg.reply('Veuillez ajouter une raison. (!kick @test#1234 test)');
      mem.kick(mc).then(() => {
        msg.channel.send(mem.user.tag + " a été kick pour " + mc + "." + " (par " + msg.author.tag + ")");
      }).catch(e => {
        msg.channel.send("Une erreur s'est produite!");
      });
    }
    if (msg.content.toLowerCase().startsWith(prefix + "ban ")) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) return;
      var mem = msg.mentions.members.first();
      var mc = msg.content.split(" ")[2];
      if (!mem)
        return msg.reply('Veuillez mentionner un utilisateur. (!ban @test#1234 test)');
      if (!mc)
        return msg.reply('Veuillez ajouter une raison. (!ban @test#1234 test)');
      mem.ban(mc).then(() => {
        msg.channel.send(mem.user.tag + " a été banni pour " + mc + "." + " (par " + msg.author.tag + ")");
      }).catch(e => {
        msg.channel.send("Une erreur s'est produite!");
      });
    }
    if (msg.content.toLowerCase().startsWith(prefix + "mute")) {
      if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
      var mem = msg.mentions.members.first();
      var mc = msg.content.split(" ")[2];
      if (!mem)
        return msg.reply('Veuillez mentionner un utilisateur. (!mute @test#1234 test)');
      if (!mc)
        return msg.reply('Veuillez ajouter une raison. (!mute @test#1234 test)');
      if (msg.guild.roles.find("name", "Muet")) {
        mem.addRole(msg.guild.roles.find("name", "Muet")).then(() => {
          msg.channel.send(mem.user.tag + " est désormais muet pour " + mc + "." + " (par " + msg.author.tag + ")");
        }).catch(e => {
          msg.channel.send("Une erreur s'est produite!");
          console.log(e);
        });
  
      }
    }
    if (msg.content.toLowerCase().startsWith(prefix + "unmute")) {
      if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
      var mem = msg.mentions.members.first();
      if (!mem)
        return msg.reply('Veuillez mentionner un utilisateur. (!unmute @test#1234)');
      if (msg.guild.roles.find("name", "Muet")) {
        mem.removeRole(msg.guild.roles.find("name", "Muet")).then(() => {
          msg.channel.send(mem.user.tag + " n'est plus muet.");
        }).catch(e => {
          msg.channel.send("Une erreur s'est produite");
          console.log(e);
        });
  
      }
    }
  });
  
//Utilitaire
client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(';');
    const command = args.shift().toLowerCase();
    if (command === "sondage") {
      if(!message.member.hasPermission("KICK_MEMBERS")) return;
      let question = args[0];
      let choix1 = args[1];
      let choix2 = args[2];
      let choix3 = args[3];
      if (args.length === 0)
        return message.reply('**Mauvais format:** `!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>`')
    var channel = client.channels.get('564725777283678211');
    channel.send("~~-----------~~" + '\n' + '\n' + ":question:" + `**__${question}__**` + '\n'  + '\n' + "" + ":one:" + ` **${choix1}**` +  '\n' + ":two:" + ` **${choix2}**` +  '\n' + ":three:" + ` **${choix3}**` + '\n' + '\n' + "*(Créer par: " + message.author.username + ")*")
    .then(function (message) {
      message.react('1⃣').then(() => message.react('2⃣')).then(() => message.react('3⃣'));
      })}});
client.on('message', message => {
  if (message.content === prefix + 'aide') {
    message.channel.send(ce(
      "#00BFFF", {"name": `Aide`, "icon_url": ""}, "", "",
      [{"name": "!myaw", "value": "Afficher une image de chat aléatoire (salon robot)."},
      {"name": "!califorcraft", "value": "Afficher le nombre de joueur en ligne."},
      {"name": "!play <youtube-url>", "value": "Ajouter une musique à la file d'attente."},
      {"name": "!play <nom de musique>", "value": "Effectuer une recheche sur YouTube."},
      {"name": "!file", "value": "Afficher la liste des musiques en file d'attente."},
      {"name": "!info", "value": "Afficher le titre de la musique en cours de lecture."},
	    {"name": "!moderation", "value": "Afficher les commandes de modération."}],
      {"thumbnail": "", "image": ""}, true
    ))
  }
});
client.on('message', message => {
  if (message.content === prefix + 'moderation') {
    message.channel.send(ce(
      "#00BFFF", {"name": `Aide`, "icon_url": ""}, "", "",
      [{"name": "!kick <nom> <raison>", "value": "Ejecter un joueur."},
      {"name": "!ban <nom> <raison>", "value": "Bannir un joueur."},
      {"name": "!mute <nom> <raison>", "value": "Rendre muet un joueur."},
      {"name": "!unmute", "value": "Rendre la parole a un joueur."},
      {"name": "!supprimer <2-100>", "value": "Supprimer des messages dans un salon textuel."},
      {"name": "!debug", "value": "Debug le bot."},
      {"name": "!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>", "value": "Lancer un sondage (affiché dans le salon sondage)."},
      {"name": "!volume <1-5>", "value": "Régler le volume de la musique."},
      {"name": "!suivant", "value": "Passer à la musique suivante dans la file d'attente."},
      {"name": "!pause", "value": "Mettre en pausse la musique en cours."},
      {"name": "!reprise", "value": "Reprendre la lecture de la musique."},
      {"name": "!stop", "value": "Stopper la musique en cours."}],
      {"thumbnail": "", "image": ""}, true
    ))
  }
});
client.on('message', msg => {
  var channel = client.channels.get('564726912489095169');
	if(msg.content.startsWith(prefix + 'myaw')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.file)
				return channel.send({embed});
			});
		} catch(err) {
			return channel.send(err.stack);
		}
  }
  if(msg.content === 'Bonjour')
    msg.channel.send("Coucou!");
  if(msg.content === 'Salut')
    msg.channel.send("Salut :)");
  if(msg.content === 'salut')
    msg.channel.send("Salut :)");
  if(msg.content === 'Bonjour')
    msg.channel.send("Coucou!");
});

//Historique
client.on('message', (message)=>{
	var channel = client.channels.get('564728475320188939');
	if(message.author.bot) return;
	if (message.channel.type.toLowerCase() == 'text') {
			var embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle('#' + message.channel.name)
			.setDescription(message.content)
			.setTimestamp(new Date())
			.setColor('#FFFFFF');
			channel.send(embed);
    }
    if (message.channel.type.toLowerCase() == 'dm') {
        var embed = new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.avatarURL)
		.setTitle('Message privé')
		.setDescription(message.content)
		.setTimestamp(new Date())
		.setColor('#FFFFFF');
        channel.send(embed);
    };
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

		var channel = client.channels.get('564828305979605002');
				var embed = new Discord.RichEmbed()
				.setAuthor(newMember.user.username, newMember.user.avatarURL)
				.setTitle('🔊 ' + newUserChannel.name)
				.setDescription('Viens de rejoindre un salon Vocal')
				.setTimestamp(new Date())
				.setColor('#00FF00');
				channel.send(embed);

  } else if(newUserChannel === undefined){

		var channel = client.channels.get('564828305979605002');
				var embed = new Discord.RichEmbed()
				.setAuthor(oldMember.user.username, oldMember.user.avatarURL)
				.setTitle('🔊 ' + oldUserChannel.name)
				.setDescription('Viens de quitter un salon Vocal')
				.setTimestamp(new Date())
				.setColor('#FF0000');
				channel.send(embed);

  }
})

//Minecraft
client.on('message', msg => { 
	if(msg.content.startsWith(prefix + 'califorcraft')) {
        snekfetch.get(api).then (r => r.body).then(x => msg.channel.send('Il y a actuellement ' + x.players.now + ' joueurs connectés sur le serveur califorcraft.eu.'));
    };
})

//Musique
client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(msg.guild.id);
  var channel = client.channels.get('564845605155897344');
  const voiceChannel = client.channels.get("564804751796076555");
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return channel.send(`✅ Playlist: **${playlist.title}** ajouté à la file d'attente!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					channel.send(`

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Veuillez écrire une valeur allant de 1 à 10 pour sélectionner l'un des résultats de la recherche.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return channel.send('❌ Aucune valeur ou valeur invalide entrée, annulant la sélection de vidéo.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return channel.send('❌ Aucun résultat de recherche obtenu.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'suivant') {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
    if (!serverQueue) return channel.send("❌ Aucune musique suivante dans la file d'attente.");
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
		if (!serverQueue) return channel.send('❌ Aucune musique à stopper.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
		if (!serverQueue) return channel.send('❌ Aucune musique en cours de lecture.');
		if (!args[1]) return channel.send(`Volume actuel: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return channel.send(`Volume réglé à: **${args[1]}**`);
	} else if (command === 'info') {
		if (!serverQueue) return channel.send('❌ Aucune musique en cours de lecture.');
		return channel.send(`🎶 Titre de la lecture en cours: **${serverQueue.songs[0].title}**`);
	} else if (command === 'file') {
		if (!serverQueue) return channel.send('❌ Aucune musique en cours de lecture.');
		return channel.send(`
__**File d'attente:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

🎶 **Lecture en cours:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return channel.send('⏸ Musique en pause');
		}
		return channel.send('❌ Aucune musique en cours de lecture.');
	} else if (command === 'reprise') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return channel.send('▶ Reprise de la lecture.');
		}
		return channel.send('❌ Aucune musique en cours de lecture.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Erreur lors de la connexion au salon vocal: ${error}`);
			queue.delete(msg.guild.id);
			return channel.send(`Erreur lors de la connexion au salon vocal: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return channel.send(`✅ **${song.title}** a été ajouté à la file d'attente`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Démarrage de la lecture: **${song.title}**`);
};
