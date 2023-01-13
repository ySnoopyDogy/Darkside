import {
  ButtonInteraction,
  EmbedBuilder,
  ModalSubmitInteraction,
} from "discord.js";
import { questionários } from "..";

const sendAnswersEmbed = async (
  int: ButtonInteraction | ModalSubmitInteraction,
  finalAnwers: string[]
): Promise<void> => {
  questionários.delete(int.user.id);

  if (int instanceof ButtonInteraction)
    int.update({
      content: `Perfeito! Obrigado pelas suas respostas. Agora um aviso. Explore os canais aqui do servidor, como o <#1041462096539435008>, o <#1014386658126340148> e o <#1023647511077998602>`,
      components: [],
    });
  else
    int.reply({
      ephemeral: true,
      content: `Perfeito! Obrigado pelas suas respostas. Agora um aviso. Explore os canais aqui do servidor, como o <#1041462096539435008>, o <#1014386658126340148> e o <#1023647511077998602>`,
    });

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
        name: "1. Você é um jogador CASUAL ou ATIVO?",
        value: `${finalAnwers[0]}`,
        inline: false,
      },
      {
        name: "2. Você fica alguns dias sem jogar ou joga todos os dias?",
        value: `${finalAnwers[1]}`,
        inline: false,
      },
      {
        name: "3. Você costuma entrar todos os dias ou não?",
        value: `${finalAnwers[2]}`,
        inline: false,
      },
      {
        name: "4. Quais plataformas você usa pra se comunicar? (Discord, Bando, Whatsapp, Nenhum)",
        value: `${finalAnwers[3]}`,
        inline: false,
      },
      {
        name: "5. Você está ciente das contrbuições mínimas da guild?",
        value: `${finalAnwers[4]}`,
        inline: false,
      },
      {
        name: "6. Qual é o seu FC e seu SUPRESSOR?",
        value: `${finalAnwers[5]}`,
        inline: false,
      },
      {
        name: "7. Você está na fila de espera para qual guilda?",
        value:
          finalAnwers.length < 7
            ? "`Este usuário é apenas visitante`"
            : `${finalAnwers[6]}`,
        inline: false,
      },
    ]);

  const channel = int.client.channels.cache.get(
    process.env.QUESTION_CHANNELS ?? ""
  );

  if (channel && channel.isTextBased()) channel.send({ embeds: [embed] });
};

export { sendAnswersEmbed };
