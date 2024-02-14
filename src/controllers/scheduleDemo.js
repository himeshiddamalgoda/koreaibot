const db = require("../models");
const Shedules = db.schedule;
const nodemailer = require("nodemailer");

// Create and Save
exports.create = (req, res) => {
  // Validate request
  if (!req.body.scheduleName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create
  const data = new Shedules({
    name: req.body.scheduleName,
    phone: req.body.phone,
    email: req.body.email,
  });

  // Save in the database
  data
  .save(data)
  .then((savedData) => {
    // Send emails using Promise.all
    return Promise.all([
      sendEmail(savedData.email, "Schedule Created", "Your schedule has been successfully created."),
      sendEmail("botadmin@sample.com", "New Demo Request", `Scheduled a new Demo with, ${savedData.name} email: ${savedData.email} phone: ${savedData.phone}`),
    ]);
  })
  .then(() => {
    // Both emails sent, now send the response
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating ",
    });
  });
};

// Function to send email using nodemailer
function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bfb9cfac7ea735",
      pass: "a8a61a133a0757",
    },
  });

  const mailOptions = {
    from: "your-email@example.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
// Retrieve all  from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Shedules.find(condition)
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

  Shedules.findById(id)
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

  Shedules.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Shedules.findByIdAndRemove(id, { useFindAndModify: false })
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


