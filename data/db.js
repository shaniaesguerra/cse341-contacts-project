const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    //if database is set-up:
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    //otherwise connect to the db:
    MongoClient.connect(process.env.MONGO_URI)
        .then((client) => {
            //assign the right database to the variable:
            database = client.db('project1'); 
            callback(null, database);
        })
        .catch((err) => {
            console.error(err);
            callback(err, null);
        });
};

const getDatabase = () => {
    //if database is not initialized:
    if (!database) {
        //throw an error:
        throw Error('Database not initialized');
    }
    //otherwise, return the database
    return database;
};

module.exports = { initDb, getDatabase };