require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

// URL of your SheetDB API
// const apiUrl = process.env.SHEETDB_API_URL;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adddata')
        .setDescription('Add data to the Google Sheet')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Your name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('email')
                .setDescription('Your email')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('age')
                .setDescription('Your age')
                .setRequired(true)),

    async execute(interaction) {
        // Get the user input from the interaction
        const name = interaction.options.getString('name');
        const email = interaction.options.getString('email');
        const age = interaction.options.getInteger('age');
        
        

        // Construct the data to be sent
        const data = {
            data: [
                {
                    Name: `${name}`,
                    Email: `${email}`,
                    Age: `${age}`
                    
                }
            ]
        };

        try {
            // Send data to SheetDB
            await axios.post(process.env.SHEETDB_API_URL, data);
            // await interaction.reply("Your data has been submitted successfully!");
            // console.log(`Your name (${name}) and email (${email}) have been successfully saved!`);
            const replyMessage = `Hey ${interaction.user.username}  😊,\n\n`
                                + `Name: ${name}\n`
                                + `Email: ${email}\n`
                                + `Age: ${age}\n\n`
                                + `All the data has been saved successfully! 🎉`;

            // Reply to the user in Discord
            await interaction.reply(replyMessage);
        } catch (error) {
            console.error('Error submitting data:', error);
            await interaction.reply('There was an error submitting your data. Please try again.');
        }
    },
};
