const botClient = require('../bot');
module.exports = {
    _name: "commands",
    _commandList: [],
    init: function(commandList){
        this._commandList = commandList;
        this.registerAllCommands();
        return this;
    },
    registerAllCommands(){
        let bot = botClient.getBot();
        this._commandList.forEach(command => {
            console.log(`Command "${command._command._name}" added with keys: [${command._command._wordKeys}]`)
            bot.command(command._command._wordKeys, command._command._callback)
        });
    },
    registerCommand(command){
        let bot = botClient.getBot();
        console.log(`Command "${command._command._name}" added with keys: [${command._command._wordKeys}]`)
        bot.command(command._command._wordKeys, command._command._callback)
    },
    addCommand(command){
        this._commandList.push(command);
        this.registerCommand(command)
    },
    getCommand(what){
        return this._commandList.find(x => x._command._name === what);
    },
    getName(){
        return this._name; 
    }
}