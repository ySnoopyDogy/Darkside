import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

const executeFirstQuestion = async (int: ButtonInteraction): Promise<void> => {
  const casual = new ButtonBuilder()
    .setLabel("CASUAL")
    .setCustomId(`CASUAL`)
    .setStyle(ButtonStyle.Primary);

  const ativo = new ButtonBuilder()
    .setLabel("ATIVO")
    .setCustomId(`ATIVO`)
    .setStyle(ButtonStyle.Primary);

  int.reply({
    content: `${int.user.toString()}, você é um jogador CASUAL ou ATIVO?`,
    components: [{ type: 1, components: [casual, ativo] }],
    ephemeral: true,
  });
};

export { executeFirstQuestion };
