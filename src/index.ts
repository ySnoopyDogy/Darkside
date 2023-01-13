import { Client, GatewayIntentBits } from "discord.js";
import createQuestionMessage from "./commands/createQuestionMessage";
import createWelcomeMessage from "./commands/createWelcomeMessage";
import { executeInteractionCreate } from "./events/interactionCreate";

const questionários = new Map();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Client ta online");
});

client.on("messageCreate", (m) => {
  if (m.author.bot) return;

  if (m.content === "Criar Comandos" && m.author.id === process.env.OWNER) {
    m.guild?.commands.set([
      createQuestionMessage.commandData,
      createWelcomeMessage.commandData,
    ]);
    m.react("✅");
  }
});

client.on("interactionCreate", executeInteractionCreate);

client.login(process.env.TOKEN);

export { questionários };
