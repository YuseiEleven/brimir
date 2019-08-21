try {
    var Discord = require("discord.js");
}
catch (e) {
    console.log(e.stack);
    console.log(process.version);
    console.log("discord js erreur");
    process.exit();
}


try {
    var fs = require("fs"); 
}
catch(e) {
    console.log("fs erreur");
    process.exit()
}


try{
    var commands = require('./commands.js').commands;
}
catch(e){
    console.log("commands erreur");
    throw new Error(e);
}

var prefix = "!";
const ce = require("embed-creator");
const { get } = require("snekfetch");

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

var bot = new Discord.Client({autoReconnect: true, disableEvents: ["TYPING_START", "TYPING_STOP", "GUILD_MEMBER_SPEAKING", "GUILD_MEMBER_AVAILABLE", "PRESSENCE_UPDATE"]});

bot.login(process.env.token);
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
bot.on('ready', () => {
	console.log("Myaw");
	setInterval(() => {
			const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
			bot.user.setActivity(activities_list[index], "STREAMING");
	}, 5000); //10 secondes=10000
});


bot.on("message", function (msg) {
    if (msg.author.id != bot.user.id && ((msg.channel.type === "dm" && msg.content[0] === "!") || (msg.channel.type != "dm" && msg.content[0]))) {
        var msgcmd = msg.content.split(" ")[0].substring(1);
        var params = msg.content.substring(msgcmd.length + 2);
        for(var module in commands){
            for(var cmnd in commands[module].commands){
                if(cmnd == msgcmd){
                    var cmd = commands[module].commands[msgcmd];
                    break;
                }
            }
        }

        if(msgcmd == "help"){
            if(params){
                if(commands[params]){
                    msg.channel.sendMessage("Utilise la commande !aide").then(msg => {
                        for(var command in commands[params].commands){
                        }
                    });
                }
                else{
                     msg.channel.sendMessage(".");
                }
            }
            else{
                    for(var module in commands) {
                        var help = commands[module].help;
                        if(help){
                        }
                        var description = commands[module].description;
                        if(description){
                        }
                    }
            }
        }
        else if(msgcmd == "eval"){
            if(msg.author.id == "110932722322505728"){
                console.log("Evaluating code...");
                try {
                    var evaled = eval(params);

                    if(typeof evaled !== "string"){
                        evaled = require("util").inspect(evaled);
                    }

                    msg.channel.sendCode("xl", clean(evaled));   
                } 
                catch(err) {
                    msg.channel.sendMessage("`ERROR` ```xl\n" + clean(err) + "\n```");
                }

                return;
            }

            msg.channel.sendMessage("Getting cheeky, aren't we? Nice try, but you ain't \"evaluating\" anything unless you're my boy Ian. ;)");
        }
        else if(cmd) {
            console.log("treating " + msg.content + " from " + msg.author + " as command");
            var choice = Math.floor((Math.random() * 9));
            cmd.process(bot, msg, params, choice);
        }
        else {
            return;
        }
    }
    else if (msg.content.indexOf("<@182989844136329217>") != -1 && msg.content[0] != '!') { //Customized language responses.
        var choice = Math.floor((Math.random() * 6));
        if (msg.content.toLowerCase().indexOf("hello") != -1 || msg.content.toLowerCase().indexOf("hi ") != -1 || msg.content.toLowerCase().indexOf("welcome") != -1) { //Greetings.
            var response = ["Hello to you, ", "Greetings, ", "Hi there, ", "Hiya, ", "Howdy, ", "*Yoshi-yosh*, "];
            msg.channel.sendMessage(response[choice] + msg.author + "!");
        }
        else if (msg.content.toLowerCase().indexOf("thank you") != -1 || msg.content.toLowerCase().indexOf("thanks") != -1 || msg.content.toLowerCase().indexOf("thank") != -1 || msg.content.toLowerCase().indexOf("thx") != -1 || msg.content.toLowerCase().indexOf("thank u") != -1) { //Gratitude
            var response = ["my pleasure!", "you're absolutely welcome.", "no problem, buddy!", "anytime!", "glad to help!", "it was nothing!"];
            msg.reply(response[choice]);
        }
        else if (msg.content.length === 21) { //Only a mention.
            if (choice === 1 || choice === 2) {
                msg.reply("may I help you? Use \"!help\" to learn about my commands.");
            }
            else if (choice === 3 || choice === 4) {
                msg.reply("what can I do for you? Use \"!help\" if you aren't aware of my options.");
            }
            else if (choice === 5 || choice === 6) {
                msg.reply("you called? Try \"!help\" to see what you could ask me to do.");
            }
        }
        else { //Anything else.
            var response = ["no u", "Y- Yoshi..?", "isokay.", "Ian, my creator, is a ~~dirty furfag~~ nice guy.", "you must have called me here for a reason... right?", "fun fact: Ian only gave me 6 options in my random language responses."];
            msg.reply(response[choice]);
        }
    }
});


//LOGS
bot.on('message', (message)=>{
	var channel = bot.channels.get('603552469263450112');
	if (message.author.bot) return;
	if (message.channel.type.toLowerCase() == 'dm' || message.channel.type.toLowerCase() == 'text') {
			var embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle('Message envoyé #' + message.channel.name)
			.setDescription(message.content)
			.setTimestamp(new Date())
			.setColor('#FFFFFF');
			channel.send(embed);
	}
});

bot.on('messageDelete', (message)=>{
	var channel = bot.channels.get('603552469263450112');
	if (message.author.bot) return;
	if (message.channel.type.toLowerCase() == 'dm' || message.channel.type.toLowerCase() == 'text') {
			var embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle('Message supprimé #' + message.channel.name)
			.setDescription(message.content)
			.setTimestamp(new Date())
			.setColor('#FF0000');
			channel.send(embed);
	}
});

bot.on('messageUpdate', (oldMessage, newMessage)=>{
	var channel = bot.channels.get('603552469263450112');
	if (oldMessage.author.bot) return;
	if (oldMessage.channel.type.toLowerCase() == 'dm' || oldMessage.channel.type.toLowerCase() == 'text') {
			var embed = new Discord.RichEmbed()
			.setAuthor(oldMessage.author.username, oldMessage.author.avatarURL)
			.setTitle('Message édité #' + oldMessage.channel.name)
			.setDescription(oldMessage.content + " Nouveau message -> " + newMessage.content)
			.setTimestamp(new Date())
			.setColor('#FF00FF');
			channel.send(embed);
	}
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

		var channel = bot.channels.get('603552551048183828');
				var embed = new Discord.RichEmbed()
				.setAuthor(newMember.user.username, newMember.user.avatarURL)
				.setTitle('🔊 ' + newUserChannel.name)
				.setDescription('Viens de rejoindre un salon Vocal')
				.setTimestamp(new Date())
				.setColor('#00FF00');
				channel.send(embed);

  } else if(newUserChannel === undefined){

		var channel = bot.channels.get('603552551048183828');
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

bot.on('message', message => {
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
bot.on('guildMemberAdd', member => {
	var role = member.guild.roles.find("name", "Client");
        member.addRole(role)
	var channel = bot.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#00FF00", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
	  [{"name": "Passez un agréable moment en notre compagnie!", "value": member.user.tag }],
	  {"text": "", "icon_url": member.guild.iconURL}, 
	  {"thumbnail": member.user.displayAvatarURL}, true
	));
  });
  bot.on('guildMemberRemove', member => {
	var channel = bot.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#FF0000", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
	  [{"name": "A bientôt!", "value": member.user.tag }],
	  {"text": "", "icon_url": member.guild.iconURL}, 
	  {"thumbnail": member.user.displayAvatarURL}, true
	));
  });
  bot.on('guildBanAdd', (guild, user) => {
	var channel = bot.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#010101", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
	  [{"name": user.tag, "value": "est désormais banni." }],
	  {"text": "", "icon_url": guild.iconURL}, 
	  {"thumbnail": user.displayAvatarURL}, true
	));
  });
  bot.on('guildBanRemove', (guild, user) => {
	var channel = bot.channels.get('603555169849966602');
	if (!channel) return;
	channel.send(ce(
	  "#EE82EE", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
	  [{"name": user.tag, "value": "est autorisé à nous rejoindre de nouveau."}],
	  {"text": "", "icon_url": guild.iconURL}, 
	  {"thumbnail": user.displayAvatarURL}, true
	));
  });

//Sondage
bot.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(';');
  const command = args.shift().toLowerCase();
  if (command === "sondage") {
    message.delete();
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

//commande
var prefixcommande = "!commande";
bot.on('message', message => {
  if(message.content.startsWith(prefixcommande)) {
    const args = message.content.slice(prefixcommande.length).trim().split('/');
    message.delete();
    let items = args[0];
      if (!items) return message.channel.send('**Item manquant:** !commande ``<item>`` / <quantité>')
    let quantité = args[1];
      if (!quantité) return message.channel.send('**Quantité manquante:** !commande <item> / ``<quantité>`')
      if (args.length === 0)
        return message.channel.send('**Mauvais format:** !commande <item> / <quantité>')
    message.guild.createChannel("commande-" + `${message.author.tag}`, "texte")
        .then(function (channel) {
          channel.setParent('613350330700136479')
        let PDG = message.guild.roles.find("name", "PDG");
        let everyone = message.guild.roles.find("name", "@everyone");
        let commande = message.guild.roles.find("name", "commande");
          channel.overwritePermissions(PDG, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          channel.overwritePermissions(commande, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          channel.overwritePermissions(everyone, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              READ_MESSAGES: false
          });
          channel.overwritePermissions(message.author, {
              SEND_MESSAGES: false,
              READ_MESSAGES: true,
              ADD_REACTIONS: false
          });
      var embed = new Discord.RichEmbed()
      .setAuthor("Commande de " + message.author.username + " :", message.author.avatarURL)
      .addBlankField()
      .addField('Items :', `${items}`, true)
      .addField('Quantité :', `${quantité}`, true)
      .addBlankField()
      .setFooter("Vous serez mentionné ici même lorsque votre commande sera prête!")
			.setTimestamp(new Date())
			.setColor('#7de5fb');
			channel.send(embed);
  })
  }
});

//Immobilier
var prefixcommandeimmo = "!immobilier";
bot.on('message', message => {
  if(message.content.startsWith(prefixcommandeimmo)) {
    const args = message.content.slice(prefixcommandeimmo.length).trim().split('/');
    message.delete();
    let recherche = args[0];
      if (!recherche) return message.channel.send('**Veuillez préciser la nature de votre recherce (ex: achat, location, vente):** !immobilier ``<achat, location, vente>`` / <budget, loyer, prix vente> / <taille, condition, nature> / <ville>')
    let budget = args[1];
      if (!budget) return message.channel.send('**Veuillez préciser votre budget (ex: 50 000$, 200$ par jour):** `!immobilier <achat, location, vente> / ``<budget, loyer, prix vente>`` / <taille, condition, nature> / <ville>')
    let condition = args[2];
      if (!condition) return message.channel.send('**Veuillez préciser quelques conditions (ex: taille, étage):** !immobilier <achat, location, vente> / <budget, loyer, prix vente> / ``<taille, condition, nature>`` / <ville>')
    let ville = args[3];
      if (!ville) return message.channel.send('**Veuillez préciez une ville (ex: California, Westham, Deus Civitas):** !immobilier <achat, location, vente> / <budget, loyer, prix vente> / <taille, condition, nature> / ``<ville>``')
      if (args.length === 0)
        return message.channel.send('**Mauvais format:** !immobilier <achat, location, vente> / <budget, loyer, prix vente> / <taille, condition, nature> / <ville>')
    message.guild.createChannel("immobilier-" + `${message.author.tag}`, "texte")
        .then(function (channel) {
          channel.setParent('613682044462956544')
        let PDG = message.guild.roles.find("name", "PDG");
        let everyone = message.guild.roles.find("name", "@everyone");
        let immobilier = message.guild.roles.find("name", "immobilier");
          channel.overwritePermissions(PDG, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          channel.overwritePermissions(immobilier, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          channel.overwritePermissions(everyone, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              READ_MESSAGES: false
          });
          channel.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true,
              ADD_REACTIONS: false
          });
      var embed = new Discord.RichEmbed()
      .setAuthor("Demande agent immobilier de " + message.author.username + " :", message.author.avatarURL)
      .addBlankField()
      .addField('Nature de la demande :', `${recherche}`, false)
      .addBlankField()
      .addField('Budget/Loyer :', `${budget}`, true)
      .addField('Condition(s) :', `${condition}`, true)
      .addField('Ville :', `${ville}`, true)
      .addBlankField()
      .setFooter("Vous serez mentionné ici même lorsque qu'un agent immobilier sera disponible!")
			.setTimestamp(new Date())
			.setColor('#7de5fb');
			channel.send(embed);
  })
  }
});

//Pubimmo
var prefixcommandeaideimmo = "!aideimmobilier";
bot.on('message', message => {
  if(message.content.startsWith(prefixcommandeaideimmo)) {
    const args = message.content.slice(prefixcommandeaideimmo.length).trim().split('/');
    message.delete();
    let aide = args[0];
      if (!aide) return message.channel.send("**Veuillez préciser si il s'agit d'une vente ou d'une location:** !immobilier ``<Vente, location>`` / <Habitation, Commerce> / <Prix, loyer> / <Description> / <Ville>")
    let nature = args[1];
      if (!nature) return message.channel.send('**Veuillez préciser la nature du bien (ex: commerce, habitation):** !immobilier <Vente, location> / ``<Habitation, Commerce>`` / <Prix, loyer> / <Description> / <Ville>')
    let prix = args[2];
      if (!prix) return message.channel.send('**Veuillez préciser le prix ou loyer voulu (ex: 50 000$, 200$ par jour):** `!immobilier <Vente, location> / <Habitation, Commerce> / ``<Prix, loyer>`` / <Description> / <Ville>')
    let description = args[3];
      if (!description) return message.channel.send("**Veuillez ajouter une description du bien (ex: taille, nombre d'étage):** !immobilier <Vente, location> / <Habitation, Commerce> / <Prix, loyer> / ``<Description>`` / <Ville>")
    let ville = args[4];
      if (!ville) return message.channel.send("**Veuillez préciez une ville, et si possible le nom de la rue (ex: California, Westham, Deus Civitas):** !immobilier <Vente, location> / <Habitation, Commerce> / <Prix, loyer> / <Description> / ``<Ville>``")
      if (args.length === 0)
        return message.channel.send('**Mauvais format:** !immobilier ``<Vente, location>`` / ``<Habitation, Commerce>`` / ``<Prix, loyer>`` / ``<Description>`` / ``<Ville>``')
    message.guild.createChannel("aideimmobilier-" + `${message.author.tag}`, "texte")
        .then(function (channel) {
          channel.setParent('613682044462956544')
        let PDG = message.guild.roles.find("name", "PDG");
        let everyone = message.guild.roles.find("name", "@everyone");
        let immobilier = message.guild.roles.find("name", "immobilier");
          channel.overwritePermissions(PDG, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          channel.overwritePermissions(immobilier, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          channel.overwritePermissions(everyone, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              READ_MESSAGES: false
          });
          channel.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true,
              ADD_REACTIONS: false
          });
      var embed = new Discord.RichEmbed()
      .setAuthor("Demande d'aide immobilière " + message.author.username + " :", message.author.avatarURL)
      .addBlankField()
      .addField('Nature de la demande :', `${aide}`, false)
      .addBlankField()
      .addField('Nature du bien :', `${nature}`, true)
      .addField('Prix/Loyer :', `${prix}`, true)
      .addField('Description :', `${description}`, true)
      .addField('Ville :', `${ville}`, true)
      .addBlankField()
      .setFooter("Vous serez mentionné ici même lorsque qu'un agent immobilier sera disponible! Vous pouvez également ajouter quelques screenshots de votre bien.")
			.setTimestamp(new Date())
			.setColor('#3bdf4e');
			channel.send(embed);
  })
  }
});

//Candidature
var prefixcandidature = "!candidature";
bot.on('message', message => {
  if(message.content.startsWith(prefixcandidature)) {
    message.delete();
    message.guild.createChannel("candidature-" + `${message.author.tag}`, "texte")
        .then(function (channel) {
          channel.setParent('613699791813214218')
        let PDG = message.guild.roles.find("name", "PDG");
        let everyone = message.guild.roles.find("name", "@everyone");
          channel.overwritePermissions(PDG, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          channel.overwritePermissions(everyone, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              READ_MESSAGES: false
          });
          channel.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true,
              ADD_REACTIONS: false
          });
      var embed = new Discord.RichEmbed()
      .setAuthor("Candidature de " + message.author.username + message.author.avatarURL)
      .setTitle('Votre candidature devra aborder les thèmes suivant :')
      .addBlankField()
      .addField('Présentation IG (et Irl si vous le souhaitez) :', `Pseudo, métier, niveau de votre métier, date d'arrivé sur le serveur, vos horraires de connexions, vos qualités et défauts, etc.`, false)
      .addField('Expériences professionnelles :', `Les entreprieses pour lesquelles vous avez aupparavant travaillé, quel poste, combien de temps, pourquoi vous n'êtes plus dans ces entreprises, etc.`, false)
      .addField('Motivations :', `Exposez vos motivations dans cette section.`, false)
      .addField('Répondre aux questions suivantes :', `Pourquoi rejoindre l'entreprise Brimir et pas une autre? Pourquoi vous et pas un autre? Que pensez-vous apporter à l'entreprise?`, false)
      .addField('Autres :', `Si vous avez des choses à ajouter.`, false)
      .addBlankField()
      .setFooter("Vous serez mentionné ici après étude de votre candidature.")
			.setTimestamp(new Date())
			.setColor('#66023C');
			channel.send(embed);
  })
  }
});


//Fermer
bot.on("message", msg => {
  if (msg.content.toLowerCase().startsWith(prefix + "fermer")) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return;
    msg.channel.delete();
  }});


//aide
bot.on('message', message => {
  if (message.content === prefix + 'aide') {
    message.delete();
    message.channel.send(ce(
      "#010101", {"name": `Aide`, "icon_url": ""}, "", "",
      [{"name": "!commande <item> / <quantité>", "value": "Passer une commande d'item (play.califorcraft.eu)."},
          {"name": "!myaw", "value": "Afficher une image de chat aléatoire."},
          {"name": "!ouaf", "value": "Afficher une image de chien aléatoire."},
          {"name": "!image <@pseudo>", "value": "Afficher l'image de profil d'un membre du serveur."},
       	  {"name": "!aléatoire <choix1, choix2, choix3, ..>", "value": "Choisir aléatoirement un des choix donnés."},
          {"name": "!8ball <question>", "value": "Obtenir une réponse à sa question."},
          {"name": "!chat <message>", "value": "Parler avec le bot."},
          {"name": "!aide mod", "value": "Afficher les commandes de modération."}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, true
    ))
  }
});
bot.on('message', message => {
  if (message.content === prefix + 'aide mod') {
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    message.channel.send(ce(
      "#010101", {"name": `Aide`, "icon_url": ""}, "", "",
      [{"name": "!kick <@pseudo> <raison>", "value": "Expulser un membre du serveur."},
          {"name": "!ban <@pseudo> <raison>", "value": "Bannir un membre du serveur."},
          {"name": "!mute <@pseudo> <raison>", "value": "Rendre muet un membre du serveur."},
          {"name": "!unmute <@pseudo>", "value": "Redonner la parole à un membre du serveur."},
	  {"name": "!purge <2-100>", "value": "Supprimer des messages dans un salon textuel."},
	  {"name": "!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>", "value": "Lancer un sondage."}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, true
    ))
  }
});

//Modération
bot.on('message', async message => {
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
bot.on("message", msg => {
  if (msg.guild === null) return;
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().startsWith(prefix + "kick ")) {
    message.delete();
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
  if (msg.content.toLowerCase().startsWith(prefix + "ban")) {
    message.delete();
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
    message.delete();
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
    message.delete();
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

//Autres
bot.on('message', msg => {
	if(msg.content.startsWith(prefix + 'myaw')) {
    message.delete();
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.file)
				var channel = bot.channels.get('603550043827601409');
				return channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(error.stack);
		}
	}});

bot.on('message', msg => {
	if(msg.content.startsWith(prefix + 'ouaf')) {
    message.delete();
		try {
			get('https://random.dog/woof.json').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.url)
				var channel = bot.channels.get('603588020758773780');
				return channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(error.stack);
		}
	}});

