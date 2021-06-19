var baseCommand = require('../base/commandBase');
class simpleReplay extends baseCommand {
    constructor() {
      super(
          "simpleReplay",
          "make SimpleReplay",
          ['simple','simp'],
          callback
      );
    }
  }

function callback(ctx) {
    var arg1 = ctx.state.command.args[0];
    ctx.reply(`${ctx.message.from.first_name}: ${arg1}`);
}

module.exports = {
    _command: {},
    _version: "1.0.0",
    init: function(){
        this._command = new simpleReplay();
        return this;
    }
}