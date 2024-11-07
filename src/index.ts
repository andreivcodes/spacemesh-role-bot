import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  Role,
  GuildMember,
  MessageReaction,
  PartialMessageReaction,
  User,
  PartialUser,
} from "discord.js";
import { config } from "dotenv";

config();

class RoleBot {
  private client: Client;
  private readonly ROLE_MAPPINGS: { [key: string]: string } = {
    "🏴‍☠️": "933676779296657478",
    "🇷🇴": "1006897148887048313",
    "🇨🇳": "1012341901908775003",
    "🇯🇵": "1012342090493079583",
    "🇰🇷": "1012342563509903381",
    "🇷🇺": "1012342777088065628",
    "🇹🇷": "1012342957925474344",
    "🇹🇭": "1012343210451931176",
    "🇪🇸": "1012343524324298834",
    "🇮🇹": "1012343606327119943",
    "🇵🇱": "1012344079302013050",
    "🇩🇪": "1092392476809121832",
    "🇮🇱": "1129001798045286500",
    "🇫🇷": "1012343122631606312",
    "🇺🇦": "1012343719032258600",
    "🇻🇳": "1176506850791931904",
    "👁️": "1006251927081853038",
  };

  private readonly CHANNEL_MESSAGE_MAPPINGS: { [key: string]: string } = {
    "935819912520286238": "935821058072805416",
    "1006896489089486929": "1012360723487281153",
  };

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.client.once(Events.ClientReady, () => console.log("Ready!"));
    this.client.on(Events.MessageReactionAdd, (reaction, user) =>
      this.handleReaction(reaction, user, true),
    );
    this.client.on(Events.MessageReactionRemove, (reaction, user) =>
      this.handleReaction(reaction, user, false),
    );
  }

  private async handleReaction(
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
    isAdding: boolean,
  ) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          "Something went wrong when fetching the reaction:",
          error,
        );
        return;
      }
    }

    if (user.partial) {
      try {
        await user.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the user:", error);
        return;
      }
    }

    const channel = reaction.message.channel;
    const expectedMessageId = this.CHANNEL_MESSAGE_MAPPINGS[channel.id];

    if (expectedMessageId && reaction.message.id === expectedMessageId) {
      const roleId = this.ROLE_MAPPINGS[reaction.emoji.name ?? ""];
      if (roleId) {
        const guild = reaction.message.guild;
        if (guild) {
          try {
            const guildMember = await guild.members.fetch(user.id);
            const role = await guild.roles.fetch(roleId);
            if (role) {
              await this.updateMemberRole(guildMember, role, isAdding);
            }
          } catch (error) {
            console.error("Error fetching guild member or role:", error);
          }
        }
      }
    }
  }

  private async updateMemberRole(
    guildMember: GuildMember,
    role: Role,
    isAdding: boolean,
  ) {
    try {
      if (isAdding) {
        await guildMember.roles.add(role);
        console.log(`Added role ${role.name} to ${guildMember.displayName}`);
      } else {
        await guildMember.roles.remove(role);
        console.log(
          `Removed role ${role.name} from ${guildMember.displayName}`,
        );
      }
    } catch (error) {
      console.error(`Error ${isAdding ? "adding" : "removing"} role:`, error);
    }
  }

  public async start() {
    await this.client.login(process.env.TOKEN);
  }
}

const bot = new RoleBot();
bot
  .start()
  .catch((error) => console.error("Unhandled error in main function:", error));
