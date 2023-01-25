import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";

const sendWantedAnswers = async (
  int: ModalSubmitInteraction
): Promise<void> => {
  int.reply({
    ephemeral: true,
    content: `Perfeito, obrigado pelas suas respostas. Entraremos em contato o mais rápido possível! <3`,
    components: [],
  });

  const baseAnswers = int.customId.split(" | ");
  baseAnswers.shift();

  const number = int.fields.getTextInputValue("NUMBER");
  const username = int.fields.getTextInputValue("NAME");

  const embed = new EmbedBuilder()
    .setColor("#01ed12")
    .setTimestamp()
    .setFooter({ text: `ID do Usuário: ${int.user.id}` })
    .setAuthor({
      name: `Respostas De ${int.user.tag}`,
      iconURL: int.user.displayAvatarURL(),
    })
    .addFields([
      {
        name: "1. Nome dentro do jogo",
        value: `✅ ${username}`,
        inline: false,
      },
      {
        name: "2. Você é um jogador CASUAL ou ATIVO?",
        value: `✅ ${baseAnswers[0]}`,
        inline: false,
      },
      {
        name: "3. Você costuma entrar no Discord?",
        value: `✅ ${baseAnswers[1]}`,
        inline: false,
      },
      {
        name: "4. Qual o seu número do WhatsApp?",
        value: `✅ ${number}`,
        inline: false,
      },
    ]);

  const channel = int.client.channels.cache.get(process.env.WANT_CHANNEL ?? "");

  const answers = embed.data.fields
    ?.map((a) => a.value.replace("✅ ", ""))
    .join(";");

  const finalMessage = `\`\`\`\n${int.user.tag};${answers}\n\`\`\``;

  if (channel && channel.isTextBased()) {
    await channel.send({ embeds: [embed] });
    await channel.send(finalMessage);
  }
};

export { sendWantedAnswers };
