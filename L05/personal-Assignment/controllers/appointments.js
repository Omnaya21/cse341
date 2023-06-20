const mongodb = require('../db/connect');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const getAllAppointments = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getAppointment = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
      res.status(500).json({message: err.message});
  }
};

const newAppointment = async (req, res) => {  
  const appointment = {
    memberName: req.body.memberName,
    leaderName: req.body.leaderName,
    phone: req.body.phone,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status
  };

  if (appointment.memberName !== "" && appointment.leaderName !== "" && appointment.date !== "" &&
      appointment.phone !== "" && appointment.time !== "") {  
    const result = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .insertOne(appointment)
      .then(result => {
        console.log(result);
        //res.setHeader('Content-Type', 'application/json');
        if (result.acknowledged) {
          res.status(201).json(result.insertedId);
        } else {
          res.status(500).json(result.error || 'Error occurred while creating appointment!');
        }
      })
      .catch(error => console.error(error));
  } else {
    res.status(500).json('Not enough fields to create an appointment!');
  }
};

const editAppointment = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const appointment = {
    memberName: req.body.memberName,
    leaderName: req.body.leaderName,
    phone: req.body.phone,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status
  };

  if (appointment.memberName !== "" && appointment.leaderName !== "" && appointment.date !== "" &&
      appointment.phone !== "" && appointment.time !== "") { 
    const result = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .replaceOne({ _id: userId }, appointment)
      .then(result => {
        console.log(result);
        if (result.modifiedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(result.error || 'Error occurred while updating appointment!');
        } 
      });
       
  } else {
    res.status(500).json('Not enough data to update appointment!');
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .deleteOne({ _id: userId }, true)
      .then(result => {
        console.log(result);
        if (result.deletedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(result.error || 'Error occurred while deleting appointment.');
        }
      });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const deleteAllAppointments = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .deleteMany({})
      .then(result => {
        console.log(result);
        if (result.deletedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(result.error || 'Error occurred while deleting appointment.');
        }
      });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports = { getAllAppointments, getAppointment, newAppointment, editAppointment, deleteAppointment, deleteAllAppointments };