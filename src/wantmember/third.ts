import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const third = async (int: ButtonInteraction): Promise<void> => {
  const modal = new ModalBuilder()
    .setTitle("Últimas Perguntas")
    .setCustomId(`${int.customId.replace(" | OPEN_MODAL", "")} | MODAl`);

  const name = new TextInputBuilder()
    .setCustomId("NAME")
    .setLabel("Qual é o seu nome dentro do jogo?")
    .setPlaceholder("ySnoopyDogy")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const number = new TextInputBuilder()
    .setCustomId("NUMBER")
    .setLabel("Qual é o seu número de celular (WhatsApp)?")
    .setPlaceholder("51 994291094")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const first = new ActionRowBuilder().addComponents(name);
  const second = new ActionRowBuilder().addComponents(number);

  // @ts-expect-error ssda
  modal.addComponents(first, second);

  await int.showModal(modal);

  int.editReply({
    content:
      "Caso você tenha fechado o formulário sem enviá-lo, clique no botão para o reabrir",
    components: [
      {
        type: 1,
        components: [
          new ButtonBuilder()
            .setCustomId(`${int.customId} | OPEN_MODAL`)
            .setLabel("Abrir o Formulário Novamente")
            .setStyle(ButtonStyle.Secondary),
        ],
      },
    ],
  });
};

export { third };
