const botClient = require('../bot');
module.exports = {
    _name: "commands",
    _commandList: [],
    _realWordCommandList: [],
    init: function(commandList){
        this._commandList = commandList;
        this.registerAllCommands();
        this.startTextHandler();
        return this;
    },
    registerAllCommands(){
        let bot = botClient.getBot();
        this._commandList.forEach(command => {
            console.log(`Command "${command._command._name}" added with keys: [${command._command._wordKeys}]`)
            bot.command(command._command._wordKeys, command._command._callback)
            //Список з командами котрі юзають виклик з тексту
            if(command._command._useRealWordKeys){
                this._realWordCommandList.push(command);
            }
        });
    },
    startTextHandler(){
        if(this._realWordCommandList.length > 0){
            let bot = botClient.getBot();
            let commands = this._realWordCommandList;
            bot.on('text', (ctx) => {
                botClient._name.forEach(botName => {//проходим всі імена бота
                    if(ctx.message.text.search(botName) != -1){
                        let botNameText = ctx.message.text.split(botName);//Режим всі згадки про бота
                        if(botNameText.length > 0 && botNameText.length <= 3){
                            botNameText.forEach(subText => {
                                if(subText.length > 1){
                                    commands.forEach(comm => { //проходим всі команди котрі мають реальні імена
                                        comm._command._realWordKeys.forEach(key => {
                                            let command = subText.indexOf(key); //шукаємо співпадіння з командою з списку
                                            if(command != -1){ //Є команда, читаєм аргуманти
                                                let commandArgsText = subText.substring(command + key.length + 1);
                                                let args = commandArgsText.split(' ');
                                                comm._command._callback(ctx,args);
                                            }
                                        })
                                    });
                                }
                            })
                        }
                    }
                });
            })
        }
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