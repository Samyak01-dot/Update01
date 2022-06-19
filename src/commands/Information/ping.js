const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('This is a ping cmd!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};