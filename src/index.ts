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
      channel.id == "935819912520286238" &&
      reaction.message.id == "935821058072805416" &&
      reaction.emoji.name == "🏴‍☠️"
    ) {
      const guildMember = await reaction.message?.guild?.members.fetch(user.id);
      const role = await reaction.message?.guild?.roles.fetch(
        "933676779296657478"
      );
      guildMember?.roles.add(role!);
    }

    if (
      channel.id == "1006896489089486929" &&
      reaction.message.id == "1012360723487281153"
    ) {
      const guildMember = await reaction.message?.guild?.members.fetch(user.id);
      let role = await reaction.message?.guild?.roles.fetch(
        "1006251927081853038"
      );
      switch (reaction.emoji.name) {
        case "🇷🇴": {
          role = await reaction.message?.guild?.roles.fetch(
            "1006897148887048313"
          );
          break;
        }
        case "🇨🇳": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012341901908775003"
          );
          break;
        }

        case "🇯🇵": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342090493079583"
          );
          break;
        }

        case "🇰🇷": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342563509903381"
          );
          break;
        }

        case "🇷🇺": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342777088065628"
          );
          break;
        }

        case "🇹🇷": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342957925474344"
          );
          break;
        }

        case "🇹🇭": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012343210451931176"
          );
          break;
        }

        case "🇪🇸": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012343524324298834"
          );
          break;
        }

        case "🇮🇹": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012343606327119943"
          );
          break;
        }

        case "🇵🇱": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012344079302013050"
          );
          break;
        }

        case "🇩🇪": {
          role = await reaction.message?.guild?.roles.fetch(
            "1092392476809121832"
          );
          break;
        }

        case "👁️": {
          role = await reaction.message?.guild?.roles.fetch(
            "1006251927081853038"
          );
          break;
        }
      }

      guildMember?.roles.add(role!);
    }
  });

  client.on(Events.MessageReactionRemove, async (reaction, user) => {
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
      channel.id == "1006896489089486929" &&
      reaction.message.id == "1012360723487281153"
    ) {
      const guildMember = await reaction.message?.guild?.members.fetch(user.id);

      let role = await reaction.message?.guild?.roles.fetch(
        "1006251927081853038"
      );
      switch (reaction.emoji.name) {
        case "🇷🇴": {
          role = await reaction.message?.guild?.roles.fetch(
            "1006897148887048313"
          );
          break;
        }
        case "🇨🇳": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012341901908775003"
          );
          break;
        }

        case "🇯🇵": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342090493079583"
          );
          break;
        }

        case "🇰🇷": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342563509903381"
          );
          break;
        }

        case "🇷🇺": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342777088065628"
          );
          break;
        }

        case "🇹🇷": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012342957925474344"
          );
          break;
        }

        case "🇹🇭": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012343210451931176"
          );
          break;
        }

        case "🇪🇸": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012343524324298834"
          );
          break;
        }

        case "🇮🇹": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012343606327119943"
          );
          break;
        }

        case "🇵🇱": {
          role = await reaction.message?.guild?.roles.fetch(
            "1012344079302013050"
          );
          break;
        }

        case "🇩🇪": {
          role = await reaction.message?.guild?.roles.fetch(
            "1092392476809121832"
          );
          break;
        }

        case "👁️": {
          role = await reaction.message?.guild?.roles.fetch(
            "1006251927081853038"
          );
          break;
        }
      }

      guildMember?.roles.remove(role!);
    }
  });

  client.login(process.env.TOKEN!);
}

main();
