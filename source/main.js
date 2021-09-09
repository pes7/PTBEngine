const bot = require('./bot');
const args = require('./commandArgs');

const mongoClient = require('./connectors/mongoClient');
const commandsModule = require('./modules/commands');
const simpleReplay = require('./commands/simpleReplay');
const louLevel = require('./commands/louLevelTestCommand');

const commandBase = require('./base/commandBase');

module.exports = {
    bot,
    "engine":{
        args,
        mongoClient
    },
    "modules":{
        commandsModule
    },
    "commands":{
        simpleReplay,
        louLevel
    },
    "base":{
        commandBase
    }
}
  
// mongoClient.init({
//     hostname: '127.0.0.1',
//     port: 27017,
//     dbName: 'petShop',
//     user: 'root',
//     password: 'password'
// },(error)=>{
//     console.log(error);
// })

// mongoClient.registerTables([
//     "Users",
//     "Cats",
//     "Payments"
// ])

// //mongoClient.registerTablesFromJson(["test","dude"],["C:/Users/Ukolov/PetShop/PetShop/item.json","C:/Users/Ukolov/PetShop/PetShop/location.json"])

// bot.init("1836718524:AAE1Ouo5ydICSjaxVtc_QLOUmIf8NLEh6zg",['шоп','магаз']);
// bot.useIt(args());
// bot.addModule(commandsModule.init([
//     simpleReplay.init(),
//     louLevel.init()
// ]));
// bot.launch();

// setTimeout(()=>{
//     mongoClient.reconnect();
// },5000)