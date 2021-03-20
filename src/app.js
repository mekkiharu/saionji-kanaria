import Discord from 'discord.js';
import { PARTIALS } from '../utils/constants/discord-constants';

const app = async () => {
  const discordClient = new Discord.Client({ partials: PARTIALS});

  discordClient.on('ready', () => {
    console.log('Saionji-Kanaria is Ready !');
  });

  discordClient.on('message', (msg) => {
    if (msg.content === 'Hallo') {
      msg.channel.send('Nyahallo!');
    }
  })

  await discordClient.login(process.env.SAIONJI_TOKEN);
};

export default app;