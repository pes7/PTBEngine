const {Telegraf} = require('telegraf')
module.exports = {
    _token: "",
    _bot: {},
    _modules: [],
    init: function(token){
        this._token = token;
        this._bot = new Telegraf(this._token)
    },
    useIt(what){
        this._bot.use(what);
    },
    addModule(module){
        console.log(`${module.getName()} module added`)
        this._modules.push(module);
        return module;
    },
    getModule(what){
        return this._modules.find(x => x._name === what);
    },
    getBot(){
        return this._bot;
    },
    launch(){
        console.log("Bot started!")
        this._bot.launch()
    }
}