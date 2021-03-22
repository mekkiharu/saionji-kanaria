import {COMMAND_PREFIX} from '../utils/constants/discord-constants.js';

const app = async (kanaInstance) => {
  const ownId = process.env.SAIONJI_KANARIA_ID;

  kanaInstance.on('message', (msg) => {
    const args = msg.content.startsWith(COMMAND_PREFIX) && msg.content.slice(COMMAND_PREFIX.length).trim().split(' ');
    const commandName = args.length ? args.shift().toLowerCase() : '';
    const wasKanaMentioned = !!msg.mentions.users.get(ownId);
    if (msg.author.id === ownId || !kanaInstance.commands.has(commandName)) {
      return;
    }

    try {
      kanaInstance.commands.get(commandName).execute(msg, args, wasKanaMentioned);
    } catch (err) {
      console.error(err);
      msg.channel.send('Kana found an error while trying to execute that command!');
    }
  });
};

export default app;