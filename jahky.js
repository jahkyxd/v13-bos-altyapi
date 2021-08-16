const {Client, MessageEmbed, Collection} = require("discord.js");
const client = bot = new Client();
const { readdirSync } = require("fs");

const config = require("./config.json")

const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

readdirSync('./commands/Global', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Global/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/Global/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Owner', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Owner/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/Owner/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

readdirSync('./commands/Advanced', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/Advanced/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/Advanced/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

client.on('message', message => {
    if (!message.guild || message.author.bot || !message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const owner = client.users.cache.get("618444525727383592");
    const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter("Developed by Jahky", owner.avatarURL({ dynamic: true }))
    if (!cmd) return;
    cmd.execute(client, message, args, embed);
})

client.login(config.bot.token).then(function(x) {console.log(`Bot ${client.user.username} olarak giriş yaptı`)}).catch(function(err) {console.log(`Bot giriş yapamadı. Sebeb: ${err}`)})