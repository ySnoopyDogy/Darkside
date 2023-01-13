import { ButtonBuilder, ButtonStyle, ModalSubmitInteraction } from "discord.js";

const executeSetimaQuestion = async (
  int: ModalSubmitInteraction
): Promise<void> => {
  const darkside = new ButtonBuilder()
    .setLabel("DarkSide")
    .setCustomId(`DarkSide`)
    .setStyle(ButtonStyle.Primary);

  const darkorder = new ButtonBuilder()
    .setLabel("DarkOrder")
    .setCustomId(`DarkOrder`)
    .setStyle(ButtonStyle.Primary);

  int.reply({
    ephemeral: true,
    content: `${int.user.toString()}, para qual guilda você está na fila de espera?`,
    components: [{ type: 1, components: [darkside, darkorder] }],
  });
};

export { executeSetimaQuestion };
