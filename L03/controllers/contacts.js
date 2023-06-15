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
  console.log(req.body);

  const result = await mongodb.getDb().db().collection('contacts').insertOne(req.body);
  
  result.toArray().then((lists) => {
      console.log(result);
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(lists[0]);
    })
    .catch(error => console.log(error)); 
};

const putSingle = async (req, res, next) => {

};

const deleteSingle = async (req, res, next) => {
  
};

module.exports = { getAll, getSingle, postSingle, putSingle, deleteSingle };