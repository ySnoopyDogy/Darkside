import { Interaction } from "discord.js";
import createMainMessage from "../commands/createMainMessage";
import { executeModal } from "./executeModal";
import { executeSelectMenu } from "./executeSelectMenu";
import { manageQuestions } from "./startQuestions";

const executeInteractionCreate = async (int: Interaction): Promise<void> => {
  if (int.isChatInputCommand()) {
    if (int.commandName === "criar_mensagem")
      return createMainMessage.execute(int);
  }

  if (int.isButton()) {
    return manageQuestions(int);
  }

  if (int.isStringSelectMenu()) {
    return executeSelectMenu(int);
  }

  if (int.isModalSubmit()) return executeModal(int);
};

export { executeInteractionCreate };
