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
  .setName("criar_mensagem")
  .setDescription("Cria a mensagem para os usuários começarem o registro")
  .addChannelOption(
    new SlashCommandChannelOption()
      .setName("canal")
      .setDescription("Canal para enviar a mensagem")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildText)
  );

const execute = async (int: ChatInputCommandInteraction): Promise<void> => {
  const channel = int.options.getChannel("canal", true) as TextChannel;

  const button = new ButtonBuilder()
    .setCustomId(`START`)
    .setLabel("Responder Perguntas")
    .setStyle(ButtonStyle.Primary);

  channel.send({
    components: [{ type: 1, components: [button] }],
    content:
      "Olá DarkSider! Para que nós possamos conhecer você melhor, clique no botão abaixo para responder algumas perguntinhas sobre como você joga Tower of Fantasy",
  });

  int.reply({ content: "Mensagem criada", ephemeral: true });
};

export default { execute, commandData };
