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

const ROLE_MAPPINGS: { [key: string]: string } = {
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
  "👁️": "1006251927081853038",
};

const CHANNEL_MESSAGE_MAPPINGS: { [key: string]: string } = {
  "935819912520286238": "935821058072805416",
  "1006896489089486929": "1012360723487281153",
};

async function main() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  });

  client.once(Events.ClientReady, () => console.log("Ready!"));

  client.on(Events.MessageReactionAdd, (reaction, user) =>
    handleReaction(reaction, user, true),
  );
  client.on(Events.MessageReactionRemove, (reaction, user) =>
    handleReaction(reaction, user, false),
  );

  await client.login(process.env.TOKEN);
}

async function handleReaction(
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
  isAdding: boolean,
) {
  // If the reaction is partial, try to fetch it
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the reaction:", error);
      return;
    }
  }

  // If the user is partial, try to fetch it
  if (user.partial) {
    try {
      await user.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the user:", error);
      return;
    }
  }

  const channel = reaction.message.channel;
  const expectedMessageId = CHANNEL_MESSAGE_MAPPINGS[channel.id];

  if (expectedMessageId && reaction.message.id === expectedMessageId) {
    const roleId = ROLE_MAPPINGS[reaction.emoji.name ?? ""];
    if (roleId) {
      const guild = reaction.message.guild;
      if (guild) {
        try {
          const guildMember = await guild.members.fetch(user.id);
          const role = await guild.roles.fetch(roleId);
          if (role) {
            await updateMemberRole(guildMember, role, isAdding);
          }
        } catch (error) {
          console.error("Error fetching guild member or role:", error);
        }
      }
    }
  }
}

async function updateMemberRole(
  guildMember: GuildMember,
  role: Role,
  isAdding: boolean,
) {
  try {
    if (isAdding) {
      await guildMember.roles.add(role);
      console.error(`Added role ${role} to ${guildMember.displayName}`);
    } else {
      await guildMember.roles.remove(role);
      console.error(`Removed role ${role} from ${guildMember.displayName}`);
    }
  } catch (error) {
    console.error(`Error ${isAdding ? "adding" : "removing"} role:`, error);
  }
}

main().catch((error) =>
  console.error("Unhandled error in main function:", error),
);
