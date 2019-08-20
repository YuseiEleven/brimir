var Discord = require("discord.js");

try {
    var fs = require("fs"); 
}
catch(e) {
    console.log("Well, no reading files, then. 'fs' is kinda necessary for that.");
    process.exit()
}

try{
    var simpleGit = require('simple-git');
}
catch(e){
    console.log("You're missing 'simple-git' from your dependencies! Surely you want this bot to update, right?");
}

try{
    var exec = require('child_process').exec;
}
catch(e){
    console.log("Now now, if you don't have 'child_process', won't be able to restart.");
}

try{
    var moment = require('moment');
}
catch(e){
    console.log("You must get 'moment' in a TIMEly manner... just get the module.");
}


try{
    var YouTube = require('youtube-node');
    var yt = new YouTube();

    yt.setKey(process.env.APIKEY);
    yt.addParam('type', 'video');
}
catch(e){
    console.log("There is no 'youtube-node' here... I guess you don't want YouTube videos.");
}

try{
	var ytdl = require('ytdl-core');
}
catch(e){
	console.log("You know, streaming audio isn't too important... but if you care, we need ytdl-core.");
}

try {
    var request = require("request");
}
catch (e) {
    console.log("I'm REQUESTing you to get 'request.' I need it for pretty much everything.")
}

try {
    var cleverbot = require("cleverbot.io");
    var CleverBot = new cleverbot('qnZi4MTKo6zwwFkh','fM2qdIkZeGiC66ADn9ylCz9nZopCAfuN');
    CleverBot.setNick("Yoshi-Bot");
    CleverBot.create(function (err, session) {
    });
}
catch(e) {
    console.log("Oh, I see. You don't want to talk to me... you don't even have 'cleverbot.io'");
}

let userInfo = JSON.parse(fs.readFileSync('./data/info.json', 'utf8'));

var confusResponses = [
	"Je n'ai pas compris.",
	"Je ne comprends pas ce que vous venez d'écrire."
]

var estoBanList = [
    "murder",
    "suicidal",
    "suicide",
    "dead",
    "retard",
    "gore",
    "retarded",
    "cancer",
    "cancerous",
    "scat",
    "shit",
    "crap",
    "poo",
    "pee",
    "feces",
    "urin",
    "piss",
    "diaper",
    "baby",
    "babies",
    "defecation",
    "child",
    "kid",
    "tod",
    "toddler",
    "cake_farts",
    "diarrhea",
    "soiled",
    "vore",
    "snuff",
    "watersports",
    "unbirthing",
    "hyper",
    "expansion",
    "inflation",
    "guro",
    "nightmare_fuel"
]

var infoCategories = {
    jeux: {alias: "Jeux", value: ""},
    genre: {alias: "Genre", value: ""},
    age: {alias: "Age", value: ""},
    twitter: {alias: "Twitter", value: ""},
    youtube: {alias: "YouTube", value: ""},
    steam: {alias: "Steam", value: ""},
    instagram: {alias: "Instagram", value: ""},
    autres: {alias: "Autres", value: ""},
    image: {alias: "Image", value: ""},
    updatedAt: ""
}

var songQueue = {
	
}


exports.commands = {
    "mod": {
        description: "All commands useful for moderation and debugging of the bot.",
        help: "!help modération",
        commands: {
            "test": {
                usage: "lel",
                description: "This is a testing space. It will change periodically as I need to test new things.",
                process: function(bot, msg, params, choice){
                    msg.channel.send("Currently, I do not have a function for this command.");
                }
            }
        }
    },

    "fun": {
        description: "All miscellaneous, recreational commands.",
        help: "!help fun",
        commands: {
            "servers": {
                usage: "!servers",
                description: "List of servers I am in.",
                process: function(bot, msg, params, choice){
                    msg.channel.send("**Je suis connecté sur:** \n```\n" + bot.guilds.map(g=>g.name).join("\n") + "\n```");
                }
            },

            "image": {
                usage: "[Optional] <name or name portion> (Ex. '!image name' or '!image')",
                description: "Returns the avatar image of the specified user. If no user is specified, returns the avatar image of the author.",
                process: function(bot, msg, params, choice){
                    if (params) {
                        if (bot.users.find("username", params) != null) {
                            msg.channel.send(bot.users.find("username", params).avatarURL);
                        }
                        else {
                            var regst = /^[^\s]+/;
                            var regend = /[^\s]+$/;
                            var match = true;
                            var users = bot.users.array();
                            var members = msg.guild.members.array();
                            for (var i = 0; i < users.length ; i++) {
                                if (regst.exec(users[i].username)[0] === params) {
                                    match = true;
                                    msg.channel.send(users[i].avatarURL);
                                    return;
                                }
                                else if (regend.exec(users[i].username)[0] === params) {
                                    match = true;
                                    msg.channel.send(users[i].avatarURL);
                                    return;
                                }
                                else {
                                    match = false;
                                }
                            }

                            for (var i = members.length - 1; i >= 0; i--) {
                            	if (members[i].nickname != null && regst.exec(members[i].nickname)[0] === params) {
                                    match = true;
                                    msg.channel.send(members[i].user.avatarURL);
                                    return;
                                }
                                else if (members[i].nickname != null && regend.exec(members[i].nickname)[0] === params) {
                                    match = true;
                                    msg.channel.send(members[i].user.avatarURL);
                                    return;
                                }
                                else {
                                    match = false;
                                }
                            }
                            if (match === false) {
                                msg.channel.send("Je ne trouve pas le membre que vous avez indiqué.");
                            }
                        }
                    }
                    else {
                        msg.channel.send(msg.author.avatarURL);
                    }
                }
            },

            "aléatoire": {
                usage: "<options to pick from> (Ex. !aléatoire option1, option2, option3)",
                description: "Will randomly pick from the number of options given by the user, separated by commas and spaces.",
                process: function(bot, msg, params, choice){
                    var options = params.split(",");
                    var randomChoice = Math.floor(Math.random() * options.length);
                    options[0] = " " + options[0];

                    msg.channel.send("Mon choix est" + options[randomChoice] + ", " + msg.author + ".");
                }
            },

            "kms": {
                usage: "!kms",
                description: "You asked for death.",
                process: function(bot, msg, params, choice){
                    msg.channel.send("You're dead, kiddo. ᕕ[•̀͜ʖ•́]︻̷┻̿═━一 ---", {tts: true});
                }
            },

            "8ball": {
                usage: "<question> (Ex. !8ball Will Ian ever get a life?)",
                description: "Will briefly turn into the Magical 8 Ball and respond to whatever question you pose.",
                process: function(bot, msg, params, choice){
                    if(params){
                        request('https://8ball.delegator.com/magic/JSON/' + params, function(error, response, body){
                            if (!error && response.statusCode == 200){
                                answer = JSON.parse(body);
                                botResponse = "`Question:` **" + params + "**\n";
                                botResponse += "`Réponse:` **" + answer.magic.answer + "**";
                                msg.channel.send(botResponse);
                            }
                            else{
                                msg.channel.send("Whoops, erreur: " + error);
                            }
                        });
                    }
                }
            },

            "chat": {
                usage: "<text> (Ex. !chat Hello, how are you?)",
                description: "Allows you to chat with Yoshi-Bot! Aren't you itching to talk to someone? Here's your chance.",
                process: function(bot, msg, params, choice){
                    CleverBot.ask(params, function (err, response) {
                        msg.channel.send(msg.author + ": " + response);
                    });
                }
            }
        }
    },

    "media": {
        help: "!help media",
        description: "All commands pertaining to music streaming and videos.",
        commands: {
            "voice": {
                usage: "!voice",
                description: "Joins the voice channel the author of the command is in.",
                process: function(bot, msg, params, choice){
                    var voiceConnections = bot.voiceConnections.array();
                    if (voiceConnections.length == 0) {
                        if(msg.member.voiceChannel == null){
                            msg.channel.send("You have to be in a voice channel before I can join it.");
                        }
                        else{
                            msg.member.voiceChannel.join();
                            msg.channel.send("Voice channel joined.");
                        }
                    }
                    else {
                        var flag = 0;
                        console.log(voiceConnections[0].channel.guild.id);
                        for(connection = 0; connection < voiceConnections.length; connection++){
                            if(msg.guild.id == voiceConnections[connection].channel.guild.id){
                                msg.channel.send("I'm already in a voice channel.");
                                flag = 1;
                            }
                        }
                        if(flag == 0){
                            msg.member.voiceChannel.join();
                            msg.channel.send("Voice channel joined.");
                        }
                    }
                }
            },

            "play": {
                usage: "<YouTube link> (Ex. !play https://www.youtube.com/watch?v=vc6vs-l5dkc)",
                description: "Queues or plays (if nothing in queue) the requested song. CURRENTLY DOES NOT QUEUE. ONLY PLAYS SONG.",
                process: function(bot, msg, params, choice){
                    var voiceConnections = bot.voiceConnections.array();
                    var flag = false;
                    for (var i = voiceConnections.length - 1; i >= 0; i--) {
                        if(msg.guild.id == voiceConnections[i].channel.guild.id){
                            flag = true;
                            connection = voiceConnections[i];
                        }
                    }
                    if(flag){
                        var youTubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
                        if(youTubeRegex.exec(params) == null){
                            msg.channel.send("I cannot parse that as a YouTube link, sorry. Try with a different one.");
                            return;
                        }
                        try{
                        	msg.channel.send("Playing that for you in just a sec...");
	                    	stream = ytdl(params, {filter : 'audioonly'});
	                    	connection.playStream(stream, { seek: 0, volume: 0.75});
                        }
                        catch(err){
                        	msg.channel.send("Error: ```" + err + "```");
                        }
                    }
                    else{
                    	msg.channel.send("I'm not in a voice channel in this server. Join one and use !voice before you can use !play.")
                    }
                    /*if (msg.content.length > 5) {
                            if (bot.internal.voiceConnection) {
                                var songName = msg.content.substring(6, msg.content.length);
                                var connection = bot.internal.voiceConnection;
                                var filePath = "https://api.soundcloud.com/tracks/194566340/stream";
                                msg.channel.send("Playing that for you in a sec...");
                                connection.playRawStream(filePath, {volume: 0.3});
                            }
                        }
                        else {
                            msg.channel.send("I'm already in the voice channel. Give me something to play.");
                        }*/
                }
            },

            "volume": {
            	usage: "<decimal between 0.25 to 1.0> (Ex. !volume 0.75)",
            	description: "If the bot is currently playing something, it will change its volume.",
            	process: function(bot, msg, params, choice){
            		var voiceConnections = bot.voiceConnections.array();
            		params = parseFloat(params);
            		console.log(params);
            		if(params == NaN){
            			msg.channel.send("That's not a number, silly.");
            		}
            		for(connection = 0; connection < voiceConnections.length; connection++){
                        if(msg.guild.id == voiceConnections[connection].channel.guild.id){
                            flag = true;
                            serverConnection = voiceConnections[connection];
                        }
                    }

                    if(flag){
                    	flag = serverConnection.player.dispatcher ? true : false;
                    	if(flag){
                    		if(params <= 1.0 && params >= 0.25){
                    			serverConnection.player.dispatcher.setVolume(params);
                    			msg.channel.send("Volume was set to: **" + params + "**");
                    			return;
                    		}
                    		msg.channel.send("Make sure the volume value you're sending is between 0.25 and 1.0");
                    		return;
                    	}
                    }

                    msg.channel.send("I don't think anything is playing right now. I can't really change the volume of nothingness.");
            	}
            },

            "yt": {
                usage: "<search terms> (Ex. !yt PFUDOR)",
                description: "Returns the first YouTube video in a search based on the input query.",
                process: function(bot, msg, params, choice){
                    if(params){
                        yt.search(params, 5, function(error, result) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                for(item in result.items){
                                    var searchResult = new Discord.RichEmbed();
                                    searchResult.setColor("#E9003A");
                                    searchResult.setTitle(result.items[item].snippet.title);
                                    searchResult.setAuthor(result.items[item].snippet.channelTitle);
                                    searchResult.setURL("https://www.youtube.com/watch?v=" + result.items[item].id.videoId);
                                    searchResult.setTimestamp(result.items[item].snippet.publishedAt);
                                    searchResult.setDescription(result.items[item].snippet.description);
                                    searchResult.setThumbnail(result.items[item].snippet.thumbnails.default.url);
                                    msg.channel.sendEmbed(searchResult);
                                }
                            }
                        });
                    }
                    else{
                        msg.channel.send("Give me some search terms to look for, silly.");
                    }
                }
            }
        }
    }
}
