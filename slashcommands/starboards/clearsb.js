const Discord = require("discord.js")
const sbSchema = require("../../models/starboard.js");
const config = require("../../config.json");

module.exports = {
  name: "clearsb",
  category: "Starboards",
  description: "Clears all of the starboards, or deletes a specific one.",
  usage: `${config.prefix}clearsb [original message id] [original message channel id]`,
  options: [
    {
      name: 'specific',
      type: 'SUB_COMMAND',
      description: 'Delete a specific starboard',
      options: [
        {
          name: 'channel',
          type: 'CHANNEL',
          description: 'The channel the starboard is in',
          required: true,
        },
        {
          name: 'message_id',
          type: 'INTEGER',
          description: 'The ID of the starboard message',
          required: true,
      },
      ]
  },
  ],
  run: async (client, message, args) => {
    if(args[0]){
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            return message.reply("You don't have permissions for that :/");
        }
        if(!args[1]){
            return message.reply("You didn't tell me which channel I should be looking in!");
        }
        const msg = await sbSchema.findOne({messageID: args[1], channelID: args[0]});
        if(!msg){
            return message.reply("Sorry, I don't think that message is a starboard");
        }
        await sbSchema.deleteOne({messageID: args[0], channelID: args[1]});
        return message.reply("Successfully deleted that starboard.");
    }
    await sbSchema.deleteMany({});
    return message.reply("Successfully deleted all of the starboards.");
  }
};