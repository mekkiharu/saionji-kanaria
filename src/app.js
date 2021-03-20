import Discord from 'discord.js';
import { PARTIALS } from '../utils/constants/discord-constants.js';

const app = async () => {
  const discordClient = new Discord.Client({ partials: PARTIALS });
  const loginToken = process.env.SAIONJI_TOKEN;
  const ownId = process.env.SAIONJI_KANARIA_ID;

  discordClient.on('ready', () => {
    console.log('Saionji-Kanaria is Ready !');
  });

  discordClient.on('message', (msg) => {
    if (msg.author.id !== ownId) {
      if (msg.content.toLowerCase().includes('hallo')) {
        msg.channel.send('Nyahallo!');
      }
    }
  })

  await discordClient.login(loginToken);
};

export default app;