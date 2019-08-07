var Discord = require("discord.js");
var fs = require("fs"); 
var commands = require('./commands.js').commands;
var client = new Discord.Client({autoReconnect: true, disableEvents: ["TYPING_START", "TYPING_STOP", "GUILD_MEMBER_SPEAKING", "GUILD_MEMBER_AVAILABLE", "PRESSENCE_UPDATE"]});
const { get } = require("snekfetch");
const ce = require("embed-creator");
client.login(process.env.token);
const prefix = '!';
var serverParams = {
    prefix: "!",
    log_channel: null,
    welcome_channel: null,
    logging_enabled: false,
    welcome_message: null,
    welcome_enabled: false
};

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

const activities_list = [
	"😺 !aide", 
	"🙀 Myaaaaw xc",
	"😿", 
	"🦄 Suis un chat licorne",
	"🐾 Pattounes",
	"🐈 !aide",
	"🐱 Meow",
	"😼 Nyahhh",
	"😹 Arrêtez les chatouilles",
	"😽 Miuuuuu"
	];

client.on('ready', () => {
	console.log("Myaw");
	setInterval(() => {
			const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
			client.user.setActivity(activities_list[index], "WATCHING");
	}, 5000); //10 seconds=10000
});

//LOGS
client.on('message', (message)=>{
	var channel = client.channels.get('603552469263450112');
	if (message.author.bot) return;
	if (message.channel.type.toLowerCase() == 'dm' || message.channel.type.toLowerCase() == 'text') {
			var embed = new Discord.RichEmbed()
			.addField('Message envoyé')
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle('#' + message.channel.name)
			.setDescription(message.content)
			.setTimestamp(new Date())
			.setColor('#FFFFFF');
			channel.send(embed);
	}
});

client.on('messageDelete', (message)=>{
	var channel = client.channels.get('603552469263450112');
	if (message.author.bot) return;
	if (message.channel.type.toLowerCase() == 'dm' || message.channel.type.toLowerCase() == 'text') {
			var embed = new Discord.RichEmbed()
			.addField('Message supprimé')
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle('#' + message.channel.name)
			.setDescription(message.content)
			.setTimestamp(new Date())
			.setColor('#FFFFFF');
			channel.send(embed);
	}
});

client.on('messageUpdate', (message)=>{
	var channel = client.channels.get('603552469263450112');
	if (message.author.bot) return;
	if (message.channel.type.toLowerCase() == 'dm' || message.channel.type.toLowerCase() == 'text') {
			var embed = new Discord.RichEmbed()
			.addField('Message édité')
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle('#' + message.channel.name)
			.setDescription(message.content)
			.setTimestamp(new Date())
			.setColor('#FFFFFF');
			channel.send(embed);
	}
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

		var channel = client.channels.get('603552551048183828');
				var embed = new Discord.RichEmbed()
				.setAuthor(newMember.user.username, newMember.user.avatarURL)
				.setTitle('🔊 ' + newUserChannel.name)
				.setDescription('Viens de rejoindre un salon Vocal')
				.setTimestamp(new Date())
				.setColor('#00FF00');
				channel.send(embed);

  } else if(newUserChannel === undefined){

		var channel = client.channels.get('603552551048183828');
				var embed = new Discord.RichEmbed()
				.setAuthor(oldMember.user.username, oldMember.user.avatarURL)
				.setTitle('🔊 ' + oldUserChannel.name)
				.setDescription('Viens de quitter un salon Vocal')
				.setTimestamp(new Date())
				.setColor('#FF0000');
				channel.send(embed);

  }
})

//Dialogues

client.on('message', message => {
  if(message.content === 'Alycia')
		message.channel.send("La plus mignonne de l'univers, elle est.. myaaaaaw :$", {tts: true});
  if(message.content === 'Paolo')
		message.channel.send("Pfpfpf il est pas bo :x", {tts: true});
  if(message.content === 'Bonjour')
		message.channel.send("Bonzour :3", {tts: true});
  if(message.content === 'Salut')
		message.channel.send("Bonzour :3", {tts: true});
  if(message.content === 'Coucou')
		message.channel.send("Bonzour :3", {tts: true});
  if(message.content === 'Bonsoir')
		message.channel.send("Bonswar :3", {tts: true});
});

//Messages d'informations
client.on('guildMemberAdd', member => {
	var role = member.guild.roles.find("name", "Chaton");
        member.addRole(role)
	var channel = client.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#00FF00", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
	  [{"name": "Passez un agréable moment en notre compagnie!", "value": member.user.tag }],
	  {"text": "", "icon_url": member.guild.iconURL}, 
	  {"thumbnail": member.user.displayAvatarURL}, true
	));
  });
  client.on('guildMemberRemove', member => {
	var channel = client.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#FF0000", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
	  [{"name": "A bientôt!", "value": member.user.tag }],
	  {"text": "", "icon_url": member.guild.iconURL}, 
	  {"thumbnail": member.user.displayAvatarURL}, true
	));
  });
  client.on('guildBanAdd', (guild, user) => {
	var channel = client.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#010101", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
	  [{"name": user.tag, "value": "est désormais banni." }],
	  {"text": "", "icon_url": guild.iconURL}, 
	  {"thumbnail": user.displayAvatarURL}, true
	));
  });
  client.on('guildBanRemove', (guild, user) => {
	var channel = client.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#EE82EE", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
	  [{"name": user.tag, "value": "est autorisé à nous rejoindre de nouveau."}],
	  {"text": "", "icon_url": guild.iconURL}, 
	  {"thumbnail": user.displayAvatarURL}, true
	));
  });

//Sondage
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
  message.channel.send("~~-----------~~" + '\n' + '\n' + ":question:" + `**__${question}__**` + '\n'  + '\n' + "" + ":one:" + ` **${choix1}**` +  '\n' + ":two:" + ` **${choix2}**` +  '\n' + ":three:" + ` **${choix3}**` + '\n' + '\n' + "*(Créer par: " + message.author.username + ")*")
  .then(function (message) {
    message.react('1⃣').then(() => message.react('2⃣')).then(() => message.react('3⃣'));
	})}});

//aide
client.on('message', message => {
  if (message.content === prefix + 'aide') {
    message.channel.send(ce(
      "#010101", {"name": `Aide`, "icon_url": ""}, "", "",
      [{"name": "!myaw", "value": "Afficher une image de chat aléatoire."},
      {"name": "!ouaf", "value": "Afficher une image de chien aléatoire."},
	  {"name": "[HS] !disneyland", "value": "Afficher les temps d'attentes du parc Disneyland Paris."},
          {"name": "[HS] !studios", "value": "Afficher les temps d'attentes du parc Walt Disney Studios."},
	  {"name": "!purge <2-100>", "value": "Supprimer des messages dans un salon textuel."},
	  {"name": "!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>", "value": "Lancer un sondage."}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, true
    ))
  }
});

//Modération
client.on('message', async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(prefix) !== 0) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	if(command === "purge") {
	  if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
	  const deleteCount = parseInt(args[0], 10);
	  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.");
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
    if (mem.hasPermission("MUTE_MEMBERS")) return;
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
