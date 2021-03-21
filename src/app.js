import { COMMAND_PREFIX } from '../utils/constants/discord-constants.js';
import { SPECIAL_CHARA_REGEX } from '../utils/constants/utility-constants.js';

const app = async (kanaInstance) => {
	const ownId = process.env.SAIONJI_KANARIA_ID;

	kanaInstance.on('message', (msg) => {
		const args = msg.content.slice(COMMAND_PREFIX.length).trim().split(' ');
		const commandName = args.length ? args.shift().toLowerCase() : msg.content.replace(SPECIAL_CHARA_REGEX, '');

		if (msg.author.id === ownId || !kanaInstance.commands.has(commandName)) {
			return;
		}

		try {
			kanaInstance.commands.get(commandName).execute(msg, args);
		} catch (err) {
			console.error(err);
			msg.channel.send('Kana found an error while trying to execute that command!');
		}
	});
};

export default app;