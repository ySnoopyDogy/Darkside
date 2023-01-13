import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { questionários } from "..";
import { executeFirstQuestion } from "../perguntas/first";

const executeModal = async (int: ModalSubmitInteraction): Promise<void> => {
  const oldAnswers = questionários.get(int.user.id);

  if (!oldAnswers) {
    questionários.set(int.user.id, {
      level: 1,
      answers: [],
    });

    // @ts-expect-error nao sei
    return executeFirstQuestion(int);
  }

  const fc = int.fields.getTextInputValue("FC");
  const supressor = int.fields.getTextInputValue("SUPRESSOR");

  const finalAnwers = [
    ...oldAnswers.answers,
    `FC: **${fc}**\nSUPRESSOR: **${supressor}**`,
  ];

  questionários.delete(int.user.id);

  int.reply({
    ephemeral: true,
    content: `Perfeito! Obrigado pelas suas respostas. Agora um aviso. Explore os canais aqui do servidor, como o <#1041462096539435008>, o <#1014386658126340148> e o <#1023647511077998602>`,
  });

  const embed = new EmbedBuilder()
    .setTitle(`Respostas de ${int.user.tag}`)
    .setColor("Random")
    .setTimestamp()
    .setAuthor({ name: int.user.tag, iconURL: int.user.displayAvatarURL() })
    .addFields([
      {
        name: "Você é um jogador CASUAL ou ATIVO?",
        value: `${finalAnwers[0]}`,
        inline: true,
      },
      {
        name: "Você fica alguns dias sem jogar ou joga todos os dias?",
        value: `${finalAnwers[1]}`,
        inline: true,
      },
      {
        name: "Você costuma entrar todos os dias ou não?",
        value: `${finalAnwers[2]}`,
        inline: true,
      },
      {
        name: "Quais plataformas você usa pra se comunicar? (Discord, Bando, Whatsapp, Nenhum)",
        value: `${finalAnwers[3]}`,
        inline: true,
      },
      {
        name: "Você está ciente das contrbuições mínimas da guild?",
        value: `${finalAnwers[4]}`,
        inline: true,
      },
      {
        name: "Qual é o seu FC e seu SUPRESSOR?",
        value: `${finalAnwers[5]}`,
        inline: true,
      },
    ]);

  const channel = int.client.channels.cache.get(process.env.SEND_MESSAGE ?? "");

  if (channel && channel.isTextBased()) channel.send({ embeds: [embed] });
};

export { executeModal };
