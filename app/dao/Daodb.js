'use strict'

//handle db queries

const mongodb = require ('mongodb');

class Daodb{

	constructor (dbData) {
		this._name = dbData.name;
		this._port = dbData.port;
		this._ip    = dbData.ip;
		this._mongoClient = mongodb.MongoClient;
	}


	/**
	* open a connection with a db
	*/
	async connectDb () {		
		//default connection options
		let defOptions = {
			poolSize : 20,
		    socketTimeoutMS : 10000,
		    useNewUrlParser: true
		};

		//Connection query
		let url = `mongodb://${this._ip}:${this._port}`;
		
		this._db = await this._connection(this._name,url,defOptions);
	}


	_connection (dbname,url,defOptions) {
		return new Promise((resolve,reject) => {
			this._mongoClient.connect(url , defOptions , function (error, client) {
				if(error != null){
					return reject (error);
				}
				return resolve(client.db(dbname));
			});
		})
	}


	/**
	* return all drivers from db 
	*/
	async getDriverStatus () {
		return new Promise ((resolve,reject) => {
			this._db.collection('drivers_status').find().addCursorFlag('noCursorTimeout',true).toArray( (err, items) => {
		       if(err != null){
		       	return reject(err);
		       }
		       return resolve(items);
		        
		    });
		})
	}

	/**
	*update in db the drivers locations, if the driver is new insert it
	* driverInfo : {
    * lat: ‘’,
    * lng: ‘’,
    * driverId: ‘’,
  	}
	*/
	async updateDriverLocation (driverInfo) {
		return new Promise((resolve,reject) => {
			let where = {
				driverId : driverInfo.driverId
			};
			this._db.collection('drivers_locations').updateOne(where,driverInfo,{upsert:true},(err, items) => {
		       if(err != null){
		       	return reject(err);
		       }
		       return resolve(items);		        
		    });
		})
	}

	/**
	* get all driver locations
	*/
	async getDriverLocations () {
		return new Promise((resolve,reject) => {
			this._db.collection('drivers_locations').find().addCursorFlag('noCursorTimeout',true).toArray( (err, items) => {
		       if(err != null){
		       	return reject(err);
		       }
		       return resolve(items);		        
		    });
		})
	}

}


// PUBLIC FUNCTIONS
module.exports = Daodb;