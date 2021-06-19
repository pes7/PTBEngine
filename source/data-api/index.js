const mongoClient = require('@edge/iiot-data-core/mongoClient.js');

module.exports = function (ST) {

	const repositoryParams = {
		hostname: ST.settings.ite.dbHostname,
		port: ST.settings.ite.dbPort,
		dbName: ST.settings.ite.dbName,
		user: ST.settings.ite.dbUser,
		password: ST.settings.ite.dbPassword,
	}

	mongoClient.init(repositoryParams,(error)=>{
		log.error(error);
	})
}