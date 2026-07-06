const mongodb = require('../data/db');

// unique ID that MongoDB uses to identify each document in a collection
const objectId = require('mongodb').ObjectId; 

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('contacts').find();
        result.toArray().then((contact) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contact);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);
        const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle
}