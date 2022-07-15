require('dotenv').config()

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

const commands = [
    new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Ranks user')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('The user to rank')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('role')
        .setDescription('The role to assign')
        .setRequired(true)
        .addChoices({ name: 'Sigma', value: 'sigma' }, { name: 'Delta', value: 'delta' }, { name: 'Gamma', value: 'gamma' })
    )
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Commands updated!'))
    .catch(console.error);