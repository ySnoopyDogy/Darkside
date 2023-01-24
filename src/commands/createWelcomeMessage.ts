import { ButtonBuilder } from "@discordjs/builders";
import {
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ButtonStyle,
  SlashCommandChannelOption,
  TextChannel,
} from "discord.js";

const commandData = new SlashCommandBuilder()
  .setName("mensagem_visitante")
  .setDescription(
    "Cria a mensagem para os usuários receberem o cargo de visitantes ou de fila de espera"
  )
  .addChannelOption(
    new SlashCommandChannelOption()
      .setName("canal")
      .setDescription("Canal para enviar a mensagem")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildText)
  );

const execute = async (int: ChatInputCommandInteraction): Promise<void> => {
  const channel = int.options.getChannel("canal", true) as TextChannel;

  const visitante = new ButtonBuilder()
    .setCustomId(`VISITANTE`)
    .setLabel("Sou Visitante")
    .setStyle(ButtonStyle.Primary);

  const membro = new ButtonBuilder()
    .setCustomId(`QUERO_MEMBRO`)
    .setLabel("Quero Ser Um Membro")
    .setStyle(ButtonStyle.Primary);

  channel.send({
    components: [{ type: 1, components: [membro, visitante] }],
    content:
      "🌟 **Olá errante** 🌟\n\n Para receber acesso parcial ao servidor, clique no botão abaixo que se encaixe na sua situação. Visitantes são aqueles que entraram no servidor para conhecer. Caso queira ser um membro da guilda, responda as perguntas clicando no botão abaixo.",
  });

  int.reply({ content: "Mensagem criada", ephemeral: true });
};

export default { execute, commandData };
