import commandGetter from '../../../utils/functions/commandGetter.js';
import { COMMAND_PREFIX, EMBED_COLOR } from '../../../utils/constants/discord-constants.js';

const helpHandler = async (message) => {
  const availableCommands = await commandGetter();
  let setCommandList = [];

  for (const command of availableCommands) {
    if (command.name) {
      setCommandList.push(`\`${command.name}\` - ${command.description}`);
    }
  }

  const helpEmbed = {
    color: EMBED_COLOR,
    title: 'Kana\'s help menu~☆!',
    description: `Most commands must be prefixed with \`${COMMAND_PREFIX}\``,
    thumbnail: {
      url: 'https://media.tenor.com/images/77421c38e0f4d74b098a65fcfc3d5d2f/tenor.gif'
    },
    fields: [
      {
        name: 'Available Commands:',
        value: `feel free to use the following commands! \n\n ${setCommandList.join('\n')}`
      },
      {
        name: 'Greetings',
        value: '\n Does not require a command prefix to trigger. As long as your word is included in' +
            ' Kanaria\'s word pool, and it\'s located somewhere she can see or you ping her directly, Kanaria will' +
            ' greet you back. '
      }
    ],
    timestamp: new Date()
  };

  return message.channel.send({embed: helpEmbed});
};

export default {
  name: 'help',
  description: 'shows a list of available commands and features',
  execute: helpHandler
};