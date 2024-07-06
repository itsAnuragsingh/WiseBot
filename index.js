require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const addDataCommand = require('./commands/adddata');



// Initialize the Discord client
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers


] });

// Register commands with Discord API
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: [addDataCommand.data.toJSON()] }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// Event: Bot is ready
client.once('ready', () => {
    console.log('Bot is online and ready!');
});



// Event: Interaction create
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'adddata') {
        await addDataCommand.execute(interaction);
    } 
});




// Log in to Discord
client.login(process.env.DISCORD_TOKEN);
