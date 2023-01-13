import { StringSelectMenuInteraction } from "discord.js";
import { questionários } from "..";
import { executeFirstQuestion } from "../perguntas/first";
import { executeQuintaQuestion } from "../perguntas/quinta";

const executeSelectMenu = async (
  int: StringSelectMenuInteraction
): Promise<void> => {
  const oldAnswers = questionários.get(int.user.id);

  if (!oldAnswers) {
    questionários.set(int.user.id, {
      level: 1,
      answers: [],
    });

    // @ts-expect-error nao sei
    return executeFirstQuestion(int);
  }

  const answers = int.values.join(", ");

  questionários.set(int.user.id, {
    level: oldAnswers.level + 1,
    answers: [...oldAnswers.answers, answers],
  });

  return executeQuintaQuestion(int);
};

export { executeSelectMenu };
