import { ButtonInteraction, GuildMember } from "discord.js";

const executeWelcomeRole = async (int: ButtonInteraction): Promise<void> => {
  const userHasRole = (int.member as GuildMember).roles.cache.some(
    (a) =>
      a.name.toLowerCase().includes("visitantes") ||
      a.name.toLowerCase().includes("espera")
  );

  if (userHasRole) {
    int.reply({
      content:
        "Você já possui um cargo de visitante/fila de espera! Caso isso seja um erro, chame um ADM",
      ephemeral: true,
    });
    return;
  }

  const roleId = (
    int.customId === "VISITANTE"
      ? process.env.ROLE_VISITANTE
      : process.env.ROLE_ESPERA
  ) as string;

  if (!(int.member instanceof GuildMember)) {
    int.reply({
      content:
        "Ops, parece que algo deu errado! Chame um ADM responsável para ver isso...",
      ephemeral: true,
    });
    return;
  }

  const result = await int.member.roles.add(roleId).catch(() => null);

  if (!result) {
    int.reply({
      content:
        "Ops, parece que algo deu errado! Chame um ADM responsável para ver isso...",
      ephemeral: true,
    });
    return;
  }

  int.reply({
    content: "Bem-Vindo! Agora, responda algumas perguntas sobre você!",
    ephemeral: true,
  });
};

export { executeWelcomeRole };
