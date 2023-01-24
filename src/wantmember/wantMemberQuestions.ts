import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { first } from "./first";
import { second } from "./second";
import { sendWantedAnswers } from "./sendAnswers";
import { third } from "./third";

const wantMember = async (int: ButtonInteraction): Promise<void> => {
  if (int.customId === "QUERO_MEMBRO") return first(int);
  if (int.customId.endsWith("OPEN_MODAL")) return third(int);

  const answers = int.customId.split(" | ");

  switch (answers.length) {
    case 2:
      return second(int);
    case 3:
      return third(int);
    case 4:
      return sendWantedAnswers(int as unknown as ModalSubmitInteraction);
  }
};

export { wantMember };
