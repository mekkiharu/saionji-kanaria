export default {
  // TODO: Create a collection of greetings to be used to trigger this command
  name: ['hallo', 'hi'],
  description: 'Greet users',
  execute: (message) => {
    message.channel.send('nyahallo!');
  }
};
