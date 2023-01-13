import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

const executeQuartaQuestion = async (int: ButtonInteraction): Promise<void> => {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("OPTIONS")
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("Participo do chat do Bando")
        .setValue("Bando"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Participo do Discord")
        .setValue("Discord"),
      new StringSelectMenuOptionBuilder()
        .setLabel("Participo do grupo do Whatsapp")
        .setValue("Whatsapp")
    )
    .setMaxValues(3)
    .setMinValues(1)
    .setPlaceholder("Escolha quais plataformas você usa");

  const nenhum = new ButtonBuilder()
    .setLabel("Não participo de nenhum chat")
    .setCustomId(`Não participo de nenhum chat`)
    .setStyle(ButtonStyle.Secondary);

  int.update({
    content: `${int.user.toString()}, voce participa do chat do bando, chat do discord ou chat do grupo do WhatsApp, ou não participa de nenhum chat?`,
    components: [
      { type: 1, components: [nenhum] },
      { type: 1, components: [selectMenu] },
    ],
  });
};

export { executeQuartaQuestion };
