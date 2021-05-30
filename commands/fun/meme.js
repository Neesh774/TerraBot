const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
const config = require("C:/Users/kkanc/Beano/config.json");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends a random meme from Reddit",
    run: async (client, message, args) => {
        const subReddits = ["dankmemes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor(config.embedColor)
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}