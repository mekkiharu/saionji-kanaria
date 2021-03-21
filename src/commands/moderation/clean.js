const cleanMessages = (message, args) => {
	const amountToClean = parseInt(args[0]);

	if (isNaN(amountToClean)) {
		return message.channel.send("Kana needs numbers!");
	}

	if (amountToClean < 2 || amountToClean > 100) {
		return message.channel.send("P-please provide an amount of messages to be deleted between 2 and 100!");
	}

	message.channel.bulkDelete(amountToClean)
		.then(messages => {
			message.channel.send(`Kana has successfully cleaned ${messages.size} messages!`);
		})
		.catch(err => {
			console.error(err);
			message.channel.send("Kana couldn't clean the channel QwQ");
		});
};

export default {
	name: 'clean',
	description: 'Removes messages in bulk or individually',
	execute: cleanMessages
};