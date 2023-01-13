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

  const espera = new ButtonBuilder()
    .setCustomId(`ESPERA`)
    .setLabel("Estou na Fila de Espera")
    .setStyle(ButtonStyle.Primary);

  channel.send({
    components: [{ type: 1, components: [espera, visitante] }],
    content:
      "Olá errante! Para receber acesso parcial ao servidor, clique no botão abaixo que se encaixe na sua situação. Visitantes são aqueles que entraram no servidor para conhecer, fila de espera são aqueles que estão na fila para entrar na GUILDA",
  });

  int.reply({ content: "Mensagem criada", ephemeral: true });
};

export default { execute, commandData };
