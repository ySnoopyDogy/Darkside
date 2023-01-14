import { GuildMember, ModalSubmitInteraction } from "discord.js";
import { questionários } from "..";
import { sendAnswersEmbed } from "../executions/sendAnswersEmbed";
import { executeFirstQuestion } from "../perguntas/first";
import { executeSetimaQuestion } from "../perguntas/setima";

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
  const username = int.fields.getTextInputValue("NAME");

  const finalAnwers = [
    ...oldAnswers.answers,
    `FC: ${fc}\nSUPRESSOR: ${supressor}\n${username}`,
  ];

  const userHasRole = (int.member as GuildMember).roles.cache.some((a) =>
    a.name.toLowerCase().includes("espera")
  );

  if (userHasRole) {
    questionários.set(int.user.id, {
      level: 6,
      answers: finalAnwers,
    });

    return executeSetimaQuestion(int);
  }

  return sendAnswersEmbed(int, finalAnwers);
};

export { executeModal };
