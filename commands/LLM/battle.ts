import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { llmChat } from '../../modules/llm.js';
import { systemPrompt, userPrompt, scatteredPrompt, associatedPrompt, todeathPrompt } from './prompts/battle.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('battle')
        .setDescription('Simulates a fight between two people.')
        .addStringOption(option =>
            option.setName('fighterone')
                .setDescription('The first fighter.')
                .setMaxLength(100)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('fightertwo')
                .setDescription('The second fighter.')
                .setMaxLength(100)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('arena')
                .setDescription('Where the combatants will fight.')
                .setMaxLength(100)
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('scatteredweapons')
                .setDescription('Scatter Weapons around the arena.'))
        .addBooleanOption(option =>
            option.setName('associatedequipment')
                .setDescription('Start fighters with equipment relevant to them.'))
        .addBooleanOption(option =>
            option.setName("todeath")
                .setDescription('fighters fight to the death')),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: false });
        let prompt = userPrompt;
        prompt = prompt.replace("fighter_1", interaction.options.getString('fighterone', true));
        prompt = prompt.replace("fighter_2", interaction.options.getString('fightertwo', true));
        prompt = prompt.replace("chosen_arena", interaction.options.getString('arena', true));
        if (interaction.options.getBoolean('scatteredweapons')) {
            prompt = prompt.replace("scattered_weapons", scatteredPrompt)
        } else {
            prompt = prompt.replace("scattered_weapons", "")
        }
        if (interaction.options.getBoolean('associatedequipment')) {
            prompt = prompt.replace("associated_equipment", associatedPrompt)
        } else {
            prompt = prompt.replace("associated_equipment", "")
        }
        if (interaction.options.getBoolean('todeath')) {
            prompt = prompt.replace("to_death", todeathPrompt)
        } else {
            prompt = prompt.replace("to_death", "")
        }
        let result = await llmChat(systemPrompt, prompt);
        while(result.length > 2000) {
                await interaction.followUp(result.slice(0, 2000))
                result = result.slice(2000, result.length)
        }
        await interaction.followUp(result)
    }
};