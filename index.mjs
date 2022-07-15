import dotenv from 'dotenv';
dotenv.config();
import fetch from "node-fetch";
import { Client, Intents } from 'discord.js';
import noblox from 'noblox.js';

const token = process.env.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    noblox.setCookie(process.env.COOKIE).then(function() {
        console.log("Cookie set");
    }).catch(function(err) {
        console.log("Unable to set cookie", err);
    })
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'rank') {
        if (interaction.member.roles.cache.some(role => role.name === "Server Manager") || interaction.member.roles.cache.some(role => role.name === "Application Reader")) {
            const user = interaction.options.getUser('user');

            await fetch(`https://verify.eryn.io/api/user/${user.id}`)
                .then(res => res.json())
                .then(json => {
                    const robloxId = json.robloxId;

                    if (interaction.options.getString('role') === 'sigma') {
                        noblox.changeRank(9726189, robloxId, 2);
                    } else {
                        noblox.changeRank(9726189, robloxId, 1);
                    }

                    interaction.reply("Rank set!");
                }).catch(err => {
                    console.log(err);
                    interaction.reply("Unable to set rank");
                });
        } else {
            interaction.reply("no")
        }
    };
});

client.login(token);