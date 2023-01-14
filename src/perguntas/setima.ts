import { ButtonBuilder, ButtonStyle, ModalSubmitInteraction } from "discord.js";

const executeSetimaQuestion = async (
  int: ModalSubmitInteraction
): Promise<void> => {
  const darkside = new ButtonBuilder()
    .setLabel("Fila de espera DarkSide")
    .setCustomId(`DarkSide`)
    .setStyle(ButtonStyle.Primary);

  const darkorder = new ButtonBuilder()
    .setLabel("Fila de espera DarkOrder")
    .setCustomId(`DarkOrder`)
    .setStyle(ButtonStyle.Primary);

  const naoFila = new ButtonBuilder()
    .setLabel("Sou apenas um visitante")
    .setCustomId(`Sou apenas um visitante`)
    .setStyle(ButtonStyle.Secondary);

  const already = new ButtonBuilder()
    .setLabel("Já sou um membro DARKSIDE")
    .setCustomId(`Já sou um membro DARKSIDE`)
    .setStyle(ButtonStyle.Success);

  int.reply({
    ephemeral: true,
    content: `${int.user.toString()}, selecione o que se encaixa com a sua situação referente à fila de espera.`,
    components: [
      { type: 1, components: [darkside, darkorder] },
      { type: 1, components: [naoFila, already] },
    ],
  });
};

export { executeSetimaQuestion };
