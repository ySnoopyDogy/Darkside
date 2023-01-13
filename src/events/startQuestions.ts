import { ButtonInteraction } from "discord.js";
import { questionários } from "..";
import { executeFirstQuestion } from "../perguntas/first";
import { executeQuartaQuestion } from "../perguntas/quarta";
import { executeQuintaQuestion } from "../perguntas/quinta";
import { executeSecondQuestion } from "../perguntas/second";
import { executeSextaQuestion } from "../perguntas/sexta";
import { executeThirdQuestion } from "../perguntas/third";

const manageQuestions = async (int: ButtonInteraction) => {
  const oldAnswers = questionários.get(int.user.id);

  if (!oldAnswers) {
    questionários.set(int.user.id, {
      level: 1,
      answers: [],
    });

    return executeFirstQuestion(int);
  }

  questionários.set(int.user.id, {
    level: oldAnswers.level + 1,
    answers: [...oldAnswers.answers, int.customId],
  });

  switch (oldAnswers.level) {
    case 1:
      return executeSecondQuestion(int);
    case 2:
      return executeThirdQuestion(int);
    case 3:
      return executeQuartaQuestion(int);
    case 4:
      return executeQuintaQuestion(int);
    case 5:
      return executeSextaQuestion(int);
  }
};

export { manageQuestions };
