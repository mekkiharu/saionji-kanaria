import fs from 'fs';

const commandGetter = async () => {
  const commandFolders = fs.readdirSync(`src/commands`);
  let commandHolder = [];

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`src/commands/${folder}`).filter(file => file.endsWith('js'));

    for (const file of commandFiles) {
      const { default: command } = await import(`../../src/commands/${folder}/${file}`);

      commandHolder.push(command);
    }
  }

  return commandHolder;
}

export default commandGetter;