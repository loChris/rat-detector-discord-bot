require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.on('ready', (c) => {
  console.log(`🐀 Logged in as ${c.user.tag}!`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
  console.log('Presence updated!');
  console.log('Old presence:', oldPresence);
  console.log('New presence:', newPresence);
  if (newPresence.user.id !== process.env.RAT_USER_ID) return;

  try {
    if (oldPresence.status === newPresence.status) return;
  } catch (e) {
    console.error(e);
  }

  if (newPresence.status !== 'online') return;

  try {
    client.channels.cache.get(process.env.CHANNEL_ID).send('🐀🐀🐀');
  } catch (e) {
    console.error(e);
  }
});

client.login(process.env.TOKEN);
