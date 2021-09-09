const MongoClient = require('mongodb').MongoClient;
const FileStream = require('fs');
const options = {
    autoReconnect: true,
    reconnectInterval: 10000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    reconnectTries: 600
}
module.exports = {
    _tables: [],
    _collectionsFromJson: [],
    init: function(repositoryParams,onError,onConnect=null){
        this._client = null;
        this._error = onError;
        this._repositoryParams = repositoryParams;
        this._dbName = repositoryParams.dbName;

        let url = "mongodb://" + repositoryParams.user + ":" + repositoryParams.password + "@" + repositoryParams.hostname + ":" 
                               + repositoryParams.port;

        if(this._client && this._client.isConnected()){
            this._client.close();
            console.log('Mongo client closed.');
        }

        console.log('Mongo connecting...');
        MongoClient.connect(url,options,(err, dbClient) => {
            if (err) {
                this._error(err);
                setTimeout((repositoryParams,onError)=>{
                    this.init(repositoryParams,onError)
                },options.reconnectInterval,repositoryParams,onError)
            }else{
                if(dbClient && dbClient.isConnected()){
                    console.log('Mongo connected!');
                    this._client = dbClient;
                    this._createCollections();
                    this._createCollectionsFromJson();
                    if(onConnect){
                        onConnect();
                    }
                }else{
                    console.log('Mongo reconnect...');
                    setTimeout((repositoryParams,onError)=>{
                        this.init(repositoryParams,onError)
                    },options.reconnectInterval,repositoryParams,onError)
                }   
            }
        });
    },
    reconnect: function () {
        console.log('Mongo reconnect by command...');
        this.init(this._repositoryParams,this._error)
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
    registerTableFromJson: function(table,jsonPath){
        this._collectionsFromJson.push({
            table:table,
            jsonPath:jsonPath
        })
    },
    registerTablesFromJson: function(tables,jsonPaths){
        let i = 0;
        tables.forEach(table => {
            this._collectionsFromJson.push({
                table:table,
                jsonPath:jsonPaths[i]
            });
            i++;
        });
    },
    registerTables: function(tables){
        tables.forEach(table => {
            this._tables.push(table);
        });
    },
    _createCollection: function(table){
        this._createCollectionInDB(table);
    },
    _createCollectionsFromJson: function(){
        this._collectionsFromJson.forEach(obj => {
            this._createCollectionInDB(obj.table,()=>{
                const json = JSON.parse(FileStream.readFileSync(obj.jsonPath, 'utf8'));
                var jsonObjects = Object.keys(json).map(key => {
                    return json[key];
                })
                let collection = this.getCollection(obj.table);
                collection.insertMany(jsonObjects, function(err, result){
                    if(err){ 
                        return console.log(err,'err');
                    }
                    console.log(`Collection ${obj.table} filled from json`);
                });
            });
        });
    },
    _createCollections: function(){
        this._tables.forEach(table => {
            this._createCollectionInDB(table);
        });
    },
    _createCollectionInDB: function(table,callback=null){
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
                if(callback)
                    callback();
            });
        }else{
            console.log(`Mongo not connected when creating table ${table}`);
        }
      }
}