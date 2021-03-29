import {config} from 'dotenv';
import Discord from 'discord.js';
import {PARTIALS} from './utils/constants/discord-constants.js';
import app from './src/app.js';
import commandGetter from './utils/functions/commandGetter.js';

config();
const kanaInstance = new Discord.Client({partials: PARTIALS});
const loginToken = process.env.SAIONJI_TOKEN;

kanaInstance.commands = new Discord.Collection();
const availableCommands = await commandGetter();

for (const command of availableCommands) {
  /**
  * Set Command Names that are type Arrays ( objects according to js )
  * as alternate command names. Useful when the command can be executed by various keys.
  */
  if (typeof command.name === 'object') {
    for (const alternateCommand of command.name) {
      kanaInstance.commands.set(alternateCommand, command);
    }
  } else {
    kanaInstance.commands.set(command.name, command);
  }
}

kanaInstance.on('ready', async () => {
  console.log('Saionji-Kanaria is Ready !');
  await kanaInstance.user.setPresence({
    status: 'online',
    activity: {
      type: 'WATCHING',
      name: 'master! |ω・)'
    }
  });
});

await kanaInstance.login(loginToken);

await app(kanaInstance);