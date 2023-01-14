import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { questionários } from "..";

const sendAnswersEmbed = async (
  int: ButtonInteraction,
  finalAnwers: string[]
): Promise<void> => {
  questionários.delete(int.user.id);

  if (int instanceof ButtonInteraction)
    int.update({
      content: `Perfeito! Obrigado pelas suas respostas. Agora um aviso. Explore os canais aqui do servidor, como o <#1041462096539435008>, o <#1014386658126340148> e o <#1023647511077998602>`,
      components: [],
    });

  const [fc, supressor, username] = finalAnwers[5].split("\n");

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
        value: `✅ ${finalAnwers[0]}`,
        inline: false,
      },
      {
        name: "3. Você fica alguns dias sem jogar ou joga todos os dias?",
        value: `✅ ${finalAnwers[1]}`,
        inline: false,
      },
      {
        name: "4. Entra em call do discord com frequencia, ou não entra nunca?",
        value: `✅ ${finalAnwers[2]}`,
        inline: false,
      },
      {
        name: "5. Quais plataformas você usa pra se comunicar? (Discord, Bando, Whatsapp, Nenhum)",
        value: `✅ ${finalAnwers[3]}`,
        inline: false,
      },
      {
        name: "6. Você está ciente das contrbuições mínimas da guild?",
        value: `✅ ${finalAnwers[4]}`,
        inline: false,
      },
      {
        name: "7. Quanto está o seu FC e seu SUPRESSOR?",
        value: `✅ ${fc}, ${supressor}`,
        inline: false,
      },
      {
        name: "8. Você está na fila de espera para alguma guilda?",
        value: `✅ ${finalAnwers[6]}`,
        inline: false,
      },
    ]);

  const channel = int.client.channels.cache.get(
    process.env.QUESTION_CHANNELS ?? ""
  );

  if (finalAnwers.length < 7) finalAnwers[6] = "VISITANTE";

  const answers = embed.data.fields
    ?.map((a) => a.value.replace("✅ ", ""))
    .join(";");

  const finalMessage = `\`\`\`\n${answers}\n\`\`\``;

  if (channel && channel.isTextBased()) {
    channel.send({ embeds: [embed] });
    channel.send(finalMessage);
  }
};

export { sendAnswersEmbed };
