import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";

const sendJustifyEmbed = async (int: ModalSubmitInteraction): Promise<void> => {
  const justify = int.fields.getTextInputValue("TEXT");

  const embed = new EmbedBuilder()
    .setColor("#41cce1")
    .setTimestamp()
    .setFooter({ text: `ID do Usuário: ${int.user.id}` })
    .setAuthor({
      name: `Justificativa de ${int.user.tag}`,
      iconURL: int.user.displayAvatarURL(),
    })
    .setDescription(justify);

  const channel = int.client.channels.cache.get(
    process.env.JUSTIFY_CHANNEL ?? ""
  );

  int.reply({
    ephemeral: true,
    content:
      "Muitíssimo obrigado por nos contar sobre você ficar offline. Fique tranquilo, todos nós temos problemas para resolver, importante é ser transparente. :heart:",
  });

  if (channel && channel.isTextBased()) channel.send({ embeds: [embed] });
};

export { sendJustifyEmbed };
