const MongoClient = require('mongodb').MongoClient;
const options = {
    autoReconnect: true,
    reconnectInterval: 10000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    reconnectTries: 600
}
module.exports = {
    init: function(repositoryParams,onError){
        this._client = null;
        this._error = onError;
        this._dbName = repositoryParams.dbName;
        let url = "mongodb://" + repositoryParams.user + ":" + repositoryParams.password + "@" + repositoryParams.hostname + ":" 
                               + repositoryParams.port + "/" + repositoryParams.dbName;

        log.info('Mongo connecting');
        MongoClient.connect(url,options,(err, dbClient) => {
            if (err) {
                this._error(err);
                setTimeout((params,onError)=>{
                    this.init(params,onError)
                },options.reconnectInterval,repositoryParams,onError)
            }else{
                log.info('Mongo connected');
                this._client = dbClient;
            }
        });
    },
    getClient: function(){
        return this._client;
    },
    getCollection: function(collectionName){
        let client = this.getClient();
        if(client && client.isConnected()){
            return client.db(this._dbName).collection(collectionName)
        }
    },
    disconnect: function(){
        let client = this.getClient();
        if (client && client.close) {
            client.close();
        }
    }
}