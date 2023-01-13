import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

const executeSecondQuestion = async (int: ButtonInteraction): Promise<void> => {
  const todos = new ButtonBuilder()
    .setLabel("Todos os Dias")
    .setCustomId(`Todos os dias`)
    .setStyle(ButtonStyle.Primary);

  const alguns = new ButtonBuilder()
    .setLabel("Alguns dias sem jogar")
    .setCustomId(`Alguns dias sem jogar`)
    .setStyle(ButtonStyle.Primary);

  int.update({
    content: `${int.user.toString()}, você fica alguns dias sem jogar, ou joga todos os dias?`,
    components: [{ type: 1, components: [todos, alguns] }],
  });
};

export { executeSecondQuestion };
