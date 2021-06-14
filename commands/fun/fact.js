const client = require('nekos.life');
const Discord = require('discord.js')
const beano = new client();
const utils = require('../../utils');
const config = require("../../config.json");


module.exports = {
  name: "fact",
  category: "fun",
  description: "sends a random fact",
  usage: `${config.prefix}fact`,
  run: async (client, message, args) => {
    //command

    async function work() {

    let bean = (await beano.sfw.fact());
    message.channel.send(bean.fact).catch(error => {
      console.error(error);
      return message.channel.send(":x: There was an error. Please make sure you're using the proper arguments and try again.");
    });

    }

    work();
  }
};