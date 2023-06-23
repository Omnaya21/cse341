const mongodb = require('../db/connect');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
      res.status(500).json({message: err.message});
  }
};

const newUser = async (req, res, next) => {  
  const user = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    email: req.body.email,
    type: req.body.type,
    status: req.body.status
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .insertOne(user)
    .then(result => {
      console.log(result);
      //res.setHeader('Content-Type', 'application/json');
      if (result.acknowledged) {
        res.status(201).json(result.insertedId);
      } else {
        res.status(500).json(result.error || 'Error occurred while creating user!');
      }
    })
    .catch(error => console.error(error));

};

const editUser = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    email: req.body.email,
    type: req.body.type,
    status: req.body.status
  };

  if (user.username !== "" && user.password !== "" && user.fullname !== "" &&
      user.email !== "" && user.type !== "") { 
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .replaceOne({ _id: userId }, user)
      .then(result => {
        console.log(result);
        if (result.modifiedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(result.error || 'Error occurred while updating user!');
        } 
      });
       
  } else {
    res.status(500).json('Not enough data to update user!');
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .deleteOne({ _id: userId }, true)
      .then(result => {
        console.log(result);
        if (result.deletedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(result.error || 'Error occurred while deleting user!');
        }
      });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports = { getAllUsers, getUser, newUser, editUser, deleteUser };