'use strict'

const config = require('./config/config.js');
const mdbr = require ('./app/dao/Daodb.js');
const server = require('./server/rest.js')

//Boot socket server

async function boot () {

	try{
		console.log(config.dbInfo);
		//test db connection
		let mdb = new mdbr(config.dbInfo);
		await mdb.connectDb();
		console.log('Db Connected');

	}catch(ex){
		console.log('Unexpected error');
		console.log(ex);
		process.exit(-1);
	}

	server.start();

}




boot();