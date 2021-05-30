const client = require('nekos.life');
const Discord = require('discord.js')
const beano = new client();
const utils = require('../../utils');


module.exports = {
    name: "fact",
    category: "fun",
  description: "sends a random fact",
  usage: "[command]",
  run: async (client, message, args) => {
  //command

    async function work() {

        let bean = (await beano.sfw.fact());
        message.channel.send(bean.fact).catch(error => {
            console.error(error);
        });

      }

      work();
  }
  };