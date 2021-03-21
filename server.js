import {config} from 'dotenv';
import fs from 'fs';
import Discord from 'discord.js';
import {PARTIALS} from './utils/constants/discord-constants.js';
import app from './src/app.js';

config();
const discordClient = new Discord.Client({partials: PARTIALS});
const loginToken = process.env.SAIONJI_TOKEN;

discordClient.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('src/commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`src/commands/${folder}`).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const {default: command} = await import(`./src/commands/${folder}/${file}`);

    if (typeof command.name === 'object') {
      for (const alternateCommand of command.name) {
        discordClient.commands.set(alternateCommand, command);
      }
    } else {
      discordClient.commands.set(command.name, command);
    }
  }
}

discordClient.on('ready', () => {
  console.log('Saionji-Kanaria is Ready !');
});

await discordClient.login(loginToken);

await app(discordClient);