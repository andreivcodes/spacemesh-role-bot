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

    if (
      channel.id == "1006896489089486929" &&
      reaction.message.id == "1012360723487281153"
    ) {
      const guildMember = await reaction.message?.guild?.members.fetch(user.id);
      const defaultRole = await reaction.message?.guild?.roles.fetch(
        "1006251927081853038"
      );
      switch (reaction.emoji.name) {
        case "🇷🇴": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1006897148887048313"
            )) ?? defaultRole!
          );
          break;
        }
        case "🇨🇳": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012341901908775003"
            )) ?? defaultRole!
          );
          break;
        }

        case "🇯🇵": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012342090493079583"
            )) ?? defaultRole!
          );
          break;
        }

        case "🇰🇷": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012342563509903381"
            )) ?? defaultRole!
          );
          break;
        }

        case "🇷🇺": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012342777088065628"
            )) ?? defaultRole!
          );
          break;
        }

        case "🇹🇷": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012342957925474344"
            )) ?? defaultRole!
          );
          break;
        }

        case "🇹🇭": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012343210451931176"
            )) ?? defaultRole!
          );
          break;
        }

        case "🇪🇸": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012343524324298834"
            )) ?? defaultRole!
          );
          break;
        }
        case "🇮🇹": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012343606327119943"
            )) ?? defaultRole!
          );
          break;
        }
        case "🇵🇱": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1012344079302013050"
            )) ?? defaultRole!
          );
          break;
        }
        case "👁️": {
          guildMember?.roles.add(
            (await reaction.message?.guild?.roles.fetch(
              "1006251927081853038"
            )) ?? defaultRole!
          );
          break;
        }
      }
    }
  });

  client.login(process.env.TOKEN!);
}

main();
