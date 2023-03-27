import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
import { config } from "dotenv";

config();

//https://discord.com/api/oauth2/authorize?client_id=1089840702378229770&permissions=268502016&scope=bot

async function main() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  });

  client.once("ready", () => {
    console.log("Ready!");
  });

  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        return;
      }
    }

    const channel = await reaction.message.channel.fetch();

    if (
      channel.id == process.env.CHANNEL_ID &&
      reaction.message.id == process.env.MESSAGE_ID &&
      reaction.emoji.name == "🏴‍☠️"
    ) {
      const guildMember = await reaction.message?.guild?.members.fetch(user.id);
      const role = await reaction.message?.guild?.roles.fetch(
        process.env.ROLE_ID ?? ""
      );
      guildMember?.roles.add(role!);
    }
  });

  client.login(process.env.TOKEN!);
}

main();
