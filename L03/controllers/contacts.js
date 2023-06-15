const mongodb = require('../db/connect');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const postSingle = async (req, res) => {  
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  if (contact.firstName !== "" && contact.lastName !== "" && contact.email !== "" &&
      contact.favoriteColor !== "" && contact.birthday !== "") {  
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(contact)
      .then(result => {
        console.log(result);
        //res.setHeader('Content-Type', 'application/json');
        if (result.acknowledged) {
          res.status(201).json(result);
        } else {
          res.status(500).json(result.error || 'Error occurred while creating contact!');
        }
      })
      .catch(error => console.error(error));
  } else {
    res.status(500).json('Not enough fields to create a contact!');
  }
};

const putSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  if (contact.firstName !== "" && contact.lastName !== "" && contact.email !== "" &&
      contact.favoriteColor !== "" && contact.birthday !== "") {
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact)
      .then(result => {
        console.log(result);
        if (result.modifiedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(result.error || 'Error occurred while updating contact!');
        } 
      });
       
  } else {
    res.status(500).json('Not enough data to update!');
  }
};

const deleteSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId }, true)
    .then(result => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(result.error || 'Error occurred while deleting contact.');
      }
    });
  
};

module.exports = { getAll, getSingle, postSingle, putSingle, deleteSingle };