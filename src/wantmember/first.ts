import { ButtonBuilder } from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle } from "discord.js";

const first = (int: ButtonInteraction) => {
  const ativo = new ButtonBuilder()
    .setCustomId("QUERO_MEMBRO | ATIVO")
    .setLabel("ATIVO")
    .setStyle(ButtonStyle.Primary);

  const casual = new ButtonBuilder()
    .setCustomId("QUERO_MEMBRO | CASUAL")
    .setLabel("CASUAL")
    .setStyle(ButtonStyle.Primary);

  int.reply({
    content: `${int.user.toString()}, você é um jogador CASUAL ou ATIVO?`,
    components: [{ type: 1, components: [casual, ativo] }],
    ephemeral: true,
  });
};

export { first };
