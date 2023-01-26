import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} from "@discordjs/builders";
import { ButtonInteraction, TextInputStyle } from "discord.js";

const sendJustifyModal = async (int: ButtonInteraction): Promise<void> => {
  const modal = new ModalBuilder()
    .setTitle("Justifique sua Ausência")
    .setCustomId("JUSTIFY_MODAL");

  const name = new TextInputBuilder()
    .setCustomId("TEXT")
    .setLabel("Justifique-se")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

  const first = new ActionRowBuilder().addComponents(name);

  // @ts-expect-error ssda
  modal.addComponents(first);

  await int.showModal(modal);
};

export { sendJustifyModal };
