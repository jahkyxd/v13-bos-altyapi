const config = require("../../config.json");

module.exports = {
    name: "ping",
    aliases: [],
    execute: async (client, message, args, embed) => {
        if (message.author.id !== config.bot.owner) return

        message.channel.send({content: `Pingim ${client.ws.ping} ms`})
    }
}