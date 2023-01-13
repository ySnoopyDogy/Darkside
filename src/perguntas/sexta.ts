import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const executeSextaQuestion = async (int: ButtonInteraction): Promise<void> => {
  const modal = new ModalBuilder()
    .setTitle("Últimas Perguntas")
    .setCustomId("MODAl");

  const fc = new TextInputBuilder()
    .setCustomId("FC")
    .setLabel("Qual é o seu FC?")
    .setPlaceholder("63859")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const supressor = new TextInputBuilder()
    .setCustomId("SUPRESSOR")
    .setLabel("Qual é o nível do seu supressor?")
    .setPlaceholder("7.4")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const first = new ActionRowBuilder().addComponents(fc);
  const second = new ActionRowBuilder().addComponents(supressor);

  // @ts-expect-error ssda
  modal.addComponents(first, second);

  await int.showModal(modal);

  int.deleteReply();
};

export { executeSextaQuestion };
