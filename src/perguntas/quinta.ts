import {
  ButtonBuilder,
  ButtonStyle,
  MessageComponentInteraction,
} from "discord.js";

const executeQuintaQuestion = async (
  int: MessageComponentInteraction
): Promise<void> => {
  const nao = new ButtonBuilder()
    .setLabel("Não, não estou ciente")
    .setCustomId(`Não, não estou ciente`)
    .setStyle(ButtonStyle.Primary);

  const sim = new ButtonBuilder()
    .setLabel("Sim, estou ciente")
    .setCustomId(`Sim, estou ciente`)
    .setStyle(ButtonStyle.Primary);

  int.update({
    content: `${int.user.toString()}, você está ciente das contribuições mínimas do bando?`,
    components: [{ type: 1, components: [nao, sim] }],
  });
};

export { executeQuintaQuestion };
