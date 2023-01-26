import { ButtonInteraction, GuildMember, Interaction } from "discord.js";
import createJustifyMessage from "../commands/createJustifyMessage";
import createQuestionMessage from "../commands/createQuestionMessage";
import createWelcomeMessage from "../commands/createWelcomeMessage";
import { sendJustifyEmbed } from "../justificar/sendJustifyModal";
import { sendJustifyModal } from "../justificar/sendModal";
import { wantMember } from "../wantmember/wantMemberQuestions";
import { executeModal } from "./executeModal";
import { executeSelectMenu } from "./executeSelectMenu";
import { manageQuestions } from "./startQuestions";

const executeInteractionCreate = async (int: Interaction): Promise<void> => {
  if (int.isChatInputCommand()) {
    if ((int.member as GuildMember).permissions.has("ManageGuild")) {
      if (int.commandName === "mensagem_registro")
        return createQuestionMessage.execute(int);

      if (int.commandName === "mensagem_recrutamento")
        return createWelcomeMessage.execute(int);

      if (int.commandName === "mensagem_justificativa")
        return createJustifyMessage.execute(int);
    }

    int.reply({
      content: "Você não tem permissão para usar esse comando",
      ephemeral: true,
    });
    return;
  }

  if (int.isButton()) {
    if (int.customId.startsWith("QUERO_MEMBRO")) return wantMember(int);
    if (int.customId === "JUSTIFY") return sendJustifyModal(int);

    if ((int.member as GuildMember).roles.cache.size === 0) {
      if (int.isRepliable())
        int.reply({
          ephemeral: true,
          content:
            "Antes de responder as questões, por favor diga-nos se você é apenas um visitante ou deseja ser um membro DARKSIDE.",
        });
    }

    return manageQuestions(int);
  }

  if (int.isStringSelectMenu()) {
    return executeSelectMenu(int);
  }

  if (int.isModalSubmit()) {
    if (int.customId.startsWith("QUERO_MEMBRO"))
      return wantMember(int as unknown as ButtonInteraction);

    if (int.customId === "JUSTIFY_MODAL") return sendJustifyEmbed(int);

    return executeModal(int);
  }
};

export { executeInteractionCreate };
