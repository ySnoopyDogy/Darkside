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
  .setName("mensagem_justificativa")
  .setDescription(
    "Cria a mensagem para os usuários mandarem a justificativa de offline"
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

  const button = new ButtonBuilder()
    .setCustomId(`JUSTIFY`)
    .setLabel("Justificar")
    .setStyle(ButtonStyle.Primary);

  channel.send({
    components: [{ type: 1, components: [button] }],
    content:
      "🔱 **Olá DarkSider** 🔱\n\nEstá com algum problema esta semana? Vai viajar ou está doente? Justifique o motivo para você estar offline ou diga-nos quando ficará off",
  });

  int.reply({ content: "Mensagem criada", ephemeral: true });
};

export default { execute, commandData };
