const bot = require('./bot');
const args = require('./commandArgs');

const mongoClient = require('./connectors/mongoClient');
mongoClient.init({
    hostname: '127.0.0.1',
    port: 27021,
    dbName: 'petShop',
    user: 'root',
    password: 'password'
},(error)=>{
    console.log(error);
})

mongoClient.registerTables([
    "Users",
    "Cats",
    "Payments"
])

const commandsModule = require('./modules/commands');
const simpleReplay = require('./commands/simpleReplay');

bot.init("1836718524:AAE1Ouo5ydICSjaxVtc_QLOUmIf8NLEh6zg");
bot.useIt(args());
bot.addModule(commandsModule.init([
    simpleReplay.init()
]));
bot.launch();