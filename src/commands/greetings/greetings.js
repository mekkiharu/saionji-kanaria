import greetingsIndex from './dataset/greetings-index.js';

const greetingsHandler = (message) => {
  const { casualGreets, timeOfDayGreets, timeOfDayReplies } = greetingsIndex;
  const isLongGreetFound = (greet) => message.content.includes(greet);
  const isShortGreetFound = (greet) => message.content === greet;

  if (casualGreets[0].greets.some(isLongGreetFound) || casualGreets[1].greets.some(isShortGreetFound)) {
    return message.channel.send('nyahallo!');
  }

  for (const [index, { greets: timeGreets, singleGreet }] of timeOfDayGreets.entries()) {
    if (timeGreets.some(isLongGreetFound) || (singleGreet === message.content)) {
      return message.channel.send(timeOfDayReplies[index]);
    }
  }
}

export default {
  name: '',
  description: 'Greet users',
  execute: greetingsHandler
};
