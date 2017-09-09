const mongoose = require('mongoose'),
      Counter = require('../models/counter')

exports.list_counter = (req, res) => {
  Counter.find({}, (err, counts) => {
    if (err) res.send(err);

    const reiCounts = counts.reduce((reiCounts, row) => {
      reiCounts[row.name] = row.count
      return reiCounts
    }, {})

    res.json(reiCounts);
  });
};

exports.update_counter = (req, res) => {
  Counter.findOneAndUpdate({_id: req.params.sentimentId}, req.body, {new: true}, (err, counter) => {
    if (err)
      res.send(err);
    res.json(counter);
  });
};

exports.create_counter = (req, res) => {
  var new_counter= new Counter(req.body);
  new_counter.save((err, counter) => {
    if (err)
      res.send(err);
    res.json(counter);
  });
};


exports.read_counter = (req, res) => {
  News.findById(req.params.counterId, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};
