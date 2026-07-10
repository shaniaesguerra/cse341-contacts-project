const { response } = require('express');
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

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || "Some error occurred while creating contact.");
    }
};

const updateContact = async (req, res) => {
    const contactId = new objectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || "Some error occurred while updating contact.");
    }
};

const deleteContact = async (req, res) => {
    const contactId = new objectId(req.params.id);
    const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || "Some error occurred while deleting contact.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}