import { ModalSubmitInteraction } from "discord.js";
import { questionários } from "..";
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

  questionários.set(int.user.id, {
    level: 6,
    answers: finalAnwers,
  });

  return executeSetimaQuestion(int);
};

export { executeModal };
