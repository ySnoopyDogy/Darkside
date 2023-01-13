import { Interaction } from "discord.js";
import createQuestionMessage from "../commands/createQuestionMessage";
import createWelcomeMessage from "../commands/createWelcomeMessage";
import { executeWelcomeRole } from "../executions/executeWelcomeRole";
import { executeModal } from "./executeModal";
import { executeSelectMenu } from "./executeSelectMenu";
import { manageQuestions } from "./startQuestions";

const executeInteractionCreate = async (int: Interaction): Promise<void> => {
  if (int.isChatInputCommand()) {
    if (int.commandName === "mensagem_registro")
      return createQuestionMessage.execute(int);

    if (int.commandName === "mensagem_visitante")
      return createWelcomeMessage.execute(int);
  }

  if (int.isButton()) {
    if (["VISITANTE", "ESPERA"].includes(int.customId))
      return executeWelcomeRole(int);

    return manageQuestions(int);
  }

  if (int.isStringSelectMenu()) {
    return executeSelectMenu(int);
  }

  if (int.isModalSubmit()) return executeModal(int);
};

export { executeInteractionCreate };
