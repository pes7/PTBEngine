class CommandBase {
    _name = ""
    _describe = ""
    _wordKeys = []
    _callback = {}
    constructor (_name,_describe,_wordKeys,_callback){
      this._name = _name;
      this._describe = _describe;
      this._wordKeys = _wordKeys;
      this._callback = _callback;
    }
  }
module.exports = CommandBase