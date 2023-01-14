import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const executeSextaQuestion = async (int: ButtonInteraction): Promise<void> => {
  const modal = new ModalBuilder()
    .setTitle("Sobre sua Conta")
    .setCustomId("MODAl");

  const name = new TextInputBuilder()
    .setCustomId("NAME")
    .setLabel("Qual é o seu nome dentro do jogo?")
    .setPlaceholder("ySnoopyDogy")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const fc = new TextInputBuilder()
    .setCustomId("FC")
    .setLabel("Quanto está o seu FC?")
    .setPlaceholder("63859")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const supressor = new TextInputBuilder()
    .setCustomId("SUPRESSOR")
    .setLabel("Qual é o nível do seu supressor?")
    .setPlaceholder("7.4")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const first = new ActionRowBuilder().addComponents(name);
  const second = new ActionRowBuilder().addComponents(supressor);
  const third = new ActionRowBuilder().addComponents(fc);

  // @ts-expect-error ssda
  modal.addComponents(first, second, third);

  await int.showModal(modal);

  int.deleteReply();
};

export { executeSextaQuestion };
