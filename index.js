const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const Distube = require("distube").default
const config = require("./config.json");
const { readdirSync, promises, fstat} = require('fs');
const ms = require("ms");
const fs = require('node:fs');
const path = require('node:path');



const bot = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

const  client  = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

client.commands = new Collection();

// Distube 

const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

let distube = new Distube(client, {
    emitNewSongOnly: true,
    searchSongs: 0,
    leaveOnStop: false,
    emitAddListWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ],
    youtubeDL: false
});

// Ready 

client.on("ready", () => {
    console.log(`I am online!`);
    client.user.setActivity("!!help", { type: "LISTENING" });
})

//cmd files

client.commands = new Collection();
const functions = fs.readdirSync("../update/src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("../update/src/events").filter(file => file.endsWith(".js"));
const commandFiles = fs.readdirSync("../update/src/commands").filter(file => file.endsWith(".js"));

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handeEvents(eventFiles, "../src/events");
    client.handleCommands(CommandFolders, "../src/commands");
})
// login

client.login(config.token);
