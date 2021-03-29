import greetingsIndex from './dataset/greetings-index.js';

const greetingsHandler = (message, args, kanaWasMentioned) => {
  const { casualGreets, timeOfDayGreets, timeOfDayReplies } = greetingsIndex;
  const normalizedMessageContent = message.content.toLowerCase();
  const isLongGreetFound = (greet) => normalizedMessageContent.includes(greet);
  const isShortGreetFound = (greet) => normalizedMessageContent.content === greet;

  if (casualGreets.greets.some(isLongGreetFound) || casualGreets.singleGreets.some(isShortGreetFound)) {
    const casualGreet = kanaWasMentioned ? `nyahallo <@${message.author.id}>!` : 'nyahallo!';

    return message.channel.send(casualGreet);
  }

  for (const [index, { greets: timeOfDayGreetings, singleGreet }] of timeOfDayGreets.entries()) {
    if (timeOfDayGreetings.some(isLongGreetFound) || (singleGreet === normalizedMessageContent.content)) {
      const timeOfDayGreet = kanaWasMentioned ? `${timeOfDayReplies[index]} <@${message.author.id}>!` : `${timeOfDayReplies[index]}!`;
      return message.channel.send(timeOfDayGreet);
    }
  }
}

export default {
  name: '',
  description: 'Greet users',
  execute: greetingsHandler
};
