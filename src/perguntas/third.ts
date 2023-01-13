import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";

const executeThirdQuestion = async (int: ButtonInteraction): Promise<void> => {
  const frequencia = new ButtonBuilder()
    .setLabel("Entro com frequência")
    .setCustomId(`Entro com frequência`)
    .setStyle(ButtonStyle.Primary);

  const nao = new ButtonBuilder()
    .setLabel("Não costumo entrar")
    .setCustomId(`Não costumo entrar`)
    .setStyle(ButtonStyle.Primary);

  int.update({
    content: `${int.user.toString()}, você entra call no Discord com frequência?`,
    components: [{ type: 1, components: [frequencia, nao] }],
  });
};

export { executeThirdQuestion };
