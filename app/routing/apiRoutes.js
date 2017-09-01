const fs = require('fs');
const multer = require('multer');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema(
  {
    img: {data: Buffer, contentType: String},
    name: {type: String},
    score: {type: Array},
    inverse: {type: Array}
  }
);

const User = mongoose.model('users', UserSchema);

function findAllExcept(res, id, surveyArr) {
  User.find({ _id: { $ne: id } }, function (err, doc) {
    if (err) return next(err);
    let score = 10000;
    let match;
    let num = 0;
    doc.forEach((user) => {
      num = Math.abs(_.sum([...surveyArr, ...user.score]));
      if (num < score) {
        score = num;
        match = user;
      }
    });
    res.json({name: match.name, id: match._id});
  });
}

module.exports = app => {
  app.get("/api/friends", function (req, res) {
    User.find({},'name score _id',function (err, doc) {
      if (err) throw err;
      res.json(doc);
    });
  });

  app.get('/img/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, doc) {
      if (err) return next(err);
      res.contentType(doc.img.contentType);
      res.send(doc.img.data);
    });
  });

  app.post("/find-match", multer({
      dest: './uploads/'
    }).single('image'),
    function (req, res) {
      let newPerson = new User();
      let inverse = req.body.survey.split(',').map((res) => {
        return -parseInt(res);
      });
      let score = req.body.survey.split(',').map((res) => {
        return parseInt(res);
      });
      newPerson.img.data = fs.readFileSync(req.file.path);
      newPerson.img.contentType = req.file.mimetype;
      newPerson.name = req.body.name;
      newPerson.score = score;
      newPerson.inverse = inverse;
      newPerson.save((err, user) => {
        if (err) throw err;
        findAllExcept(res, user._id, user.inverse)
      });
    });
};