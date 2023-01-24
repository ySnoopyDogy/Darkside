import { ButtonBuilder } from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle } from "discord.js";

const second = (int: ButtonInteraction) => {
  const sim = new ButtonBuilder()
    .setCustomId(`${int.customId} | SIM`)
    .setLabel("SIM")
    .setStyle(ButtonStyle.Primary);

  const nao = new ButtonBuilder()
    .setCustomId(`${int.customId} | NÃO`)
    .setLabel("NÃO")
    .setStyle(ButtonStyle.Primary);

  int.update({
    content: `${int.user.toString()}, você costuma usar o Discord?`,
    components: [{ type: 1, components: [sim, nao] }],
  });
};

export { second };
