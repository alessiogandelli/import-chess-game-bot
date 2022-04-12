const axios = require('axios')
const dotenv = require('dotenv')
const { Telegraf } = require('telegraf')

dotenv.config()
const bot = new Telegraf(process.env.BOT_TOKEN)


async function main() {
    bot.start((ctx) => ctx.reply('Welcome!'))
    bot.on('message',(ctx) => getUrl(ctx))
    bot.launch()
}



async function getUrl(ctx) {

    pgn = ctx.message.text

    if(pgn[0] == 1) {
        res = await post(pgn)
        ctx.reply(res.data.url)
    }
}


async function post(pgn) {

    try {
        return await axios.post('https://lichess.org/api/import', {pgn: pgn })
    } catch (error) {
        console.log('status', error.response.status)
        throw Error("errrore")
    }
}



main()