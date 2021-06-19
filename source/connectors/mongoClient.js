const MongoClient = require('mongodb').MongoClient;
const options = {
    autoReconnect: true,
    reconnectInterval: 10000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    reconnectTries: 600
}
module.exports = {
    _tables: [],
    init: function(repositoryParams,onError){
        this._client = null;
        this._error = onError;
        this._dbName = repositoryParams.dbName;

        let url = "mongodb://" + repositoryParams.user + ":" + repositoryParams.password + "@" + repositoryParams.hostname + ":" 
                               + repositoryParams.port;

        console.log('Mongo connecting');
        MongoClient.connect(url,options,(err, dbClient) => {
            if (err) {
                this._error(err);
                setTimeout((params,onError)=>{
                    this.init(params,onError)
                },options.reconnectInterval,repositoryParams,onError)
            }else{
                console.log('Mongo connected');
                this._client = dbClient;
                this._createCollections();
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
    },
    registerTable: function(table){
        this._tables.push(table);
        this._createCollection(table);
    },
    registerTables: function(tables){
        tables.forEach(table => {
            this._tables.push(table);
        });
    },
    _createCollection: function(table){
        this._createCollectionInDB(table);
    },
    _createCollections: function(){
        this._tables.forEach(table => {
            this._createCollectionInDB(table);
        });
    },
    _createCollectionInDB: function(table){
        console.log(`Check ${table}`)
        if(this._client){
            var db = this._client.db(this._dbName);
            db.createCollection(table, function(err, res) {
                if(err.code != 48) {
                    console.log(`Collection ${table} created!`);
                }else if(err.code == 48){
                    console.log(`Collection ${table} allready exist!`)
                }else{
                    console.log(err)
                }
            });
        }else{
            console.log(`Mongo not connected when creating table ${table}`);
        }
      }
}