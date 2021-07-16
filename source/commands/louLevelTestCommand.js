var baseCommand = require('../base/commandBase');
class simpleReplay extends baseCommand {
    constructor() {
      super(
          "louLevelTestCommand",
          "test command",
          ['test','t'],
          callback
      );
    }
  }

function callback(ctx) {
    ctx.reply(`${ctx.message.from.first_name} это тестовая команда!`);
}

module.exports = {
    _command: {},
    _version: "1.0.0",
    init: function(){
        this._command = new simpleReplay();
        return this;
    }
}