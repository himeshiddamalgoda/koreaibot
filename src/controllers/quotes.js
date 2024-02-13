const db = require("../models");
const Quotes = db.quote;

// Create and Save 
exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
  if (!req.body.userName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create 
  const data = new Quotes({
    name: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    description: req.body.description,
  });

  // Save  in the database
  data
    .save(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating "
      });
    });
};

// Retrieve all  from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Quotes.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
};

// Find a single  with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Quotes.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving with id=" + id });
    });
};

// Update a  by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Quotes.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update with id=${id}. Maybe was not found!`
        });
      } else res.send({ message: "updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating with id=" + id
      });
    });
};

// Delete  with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Quotes.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete with id=${id}. Maybe was not found!`
        });
      } else {
        res.send({
          message: "deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete with id=" + id
      });
    });
};


