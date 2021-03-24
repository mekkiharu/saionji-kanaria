import {COMMAND_PREFIX} from '../utils/constants/discord-constants.js';
import Discord from 'discord.js';

const app = async (kanaInstance) => {
  const ownId = process.env.SAIONJI_KANARIA_ID;
  const { default: configs } = await import(process.env.CONFIGS_URL);
  const findWelcomeChannel = (channel) => channel.name === configs.welcomeChannelList[channel.guild.id].channelName;
  const findDefaultRole = (role) => role.name === configs.defaultRoles[role.guild.id]?.roleName;

  kanaInstance.on('guildMemberAdd', async member => {
    const welcomeEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} just joined!`, member.user.avatarURL())
        .setDescription(`Welcome to ${member.guild.name}!`)
        .setColor('8A2BE2');

    const welcomeChannel = member.guild.channels.cache.find(findWelcomeChannel);
    const listedBaseRole = member.guild.roles.cache.find(findDefaultRole);

    try {
      if (listedBaseRole) {
        await member.roles.add(listedBaseRole);
      }

      if (welcomeChannel) {
        await member.guild.channels.cache.get(welcomeChannel.id).send(welcomeEmbed);
      }
    } catch (err) {
      console.error(`Guild Member Add Err: ${err}`);
    }
  });

  kanaInstance.on('message', msg => {
    const args = msg.content.startsWith(COMMAND_PREFIX) && msg.content.slice(COMMAND_PREFIX.length).trim().split(' ');
    const commandName = args.length ? args.shift().toLowerCase() : '';
    const wasKanaMentioned = !!msg.mentions.users.get(ownId);

    if (msg.author.bot || !kanaInstance.commands.has(commandName)) {
      return;
    }

    try {
      kanaInstance.commands.get(commandName).execute(msg, args, wasKanaMentioned);
    } catch (err) {
      console.error(`Message event err: ${err}`);
    }
  });
};

export default app;