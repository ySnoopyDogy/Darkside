import { ButtonInteraction } from "discord.js";
import { questionários } from "..";
import { sendAnswersEmbed } from "../executions/sendAnswersEmbed";
import { executeFirstQuestion } from "../perguntas/first";
import { executeQuartaQuestion } from "../perguntas/quarta";
import { executeQuintaQuestion } from "../perguntas/quinta";
import { executeSecondQuestion } from "../perguntas/second";
import { executeSextaQuestion } from "../perguntas/sexta";
import { executeThirdQuestion } from "../perguntas/third";

const makeQuestionBasedOnLevel = async (
  int: ButtonInteraction,
  level: number
): Promise<void> => {
  switch (level) {
    case 0:
      return executeFirstQuestion(int);
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
    case 6:
      return sendAnswersEmbed(int, questionários.get(int.user.id).answers);
  }
};

const manageQuestions = async (int: ButtonInteraction) => {
  const oldAnswers = questionários.get(int.user.id);

  if (!oldAnswers || int.customId === "START") {
    questionários.set(int.user.id, {
      level: 1,
      answers: [],
    });

    return executeFirstQuestion(int);
  }

  if (oldAnswers.level === 6 && int.customId === "OPEN_MODAL")
    return executeSextaQuestion(int);

  questionários.set(int.user.id, {
    level: oldAnswers.level + 1,
    answers: [...oldAnswers.answers, int.customId],
  });

  makeQuestionBasedOnLevel(int, oldAnswers.level);
};

export { manageQuestions };
