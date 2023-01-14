import { GuildMember, Interaction } from "discord.js";
import createQuestionMessage from "../commands/createQuestionMessage";
import createWelcomeMessage from "../commands/createWelcomeMessage";
import { executeWelcomeRole } from "../executions/executeWelcomeRole";
import { executeModal } from "./executeModal";
import { executeSelectMenu } from "./executeSelectMenu";
import { manageQuestions } from "./startQuestions";

const executeInteractionCreate = async (int: Interaction): Promise<void> => {
  if (int.isChatInputCommand()) {
    if ((int.member as GuildMember).permissions.has("ManageGuild")) {
      if (int.commandName === "mensagem_registro")
        return createQuestionMessage.execute(int);

      if (int.commandName === "mensagem_visitante")
        return createWelcomeMessage.execute(int);
    }

    int.reply({
      content: "Você não tem permissão para usar esse comando",
      ephemeral: true,
    });
    return;
  }

  if (int.isButton()) {
    if (["VISITANTE", "ESPERA"].includes(int.customId))
      return executeWelcomeRole(int);

    if ((int.member as GuildMember).roles.cache.size === 0) {
      if (int.isRepliable())
        int.reply({
          ephemeral: true,
          content:
            "Antes de responder as questões, por favor escolha se você é um visitante ou alguém na fila de espera",
        });
    }

    return manageQuestions(int);
  }

  if (int.isStringSelectMenu()) {
    return executeSelectMenu(int);
  }

  if (int.isModalSubmit()) return executeModal(int);
};

export { executeInteractionCreate };
