const mongoose = require('mongoose')
const News = require('../models/news')

exports.list_news = (req, res) => {
  News.find({}, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.create_news = (req, res) => {
  var new_product = new News(req.body);
  new_product.save((err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.read_news = (req, res) => {
  News.findById(req.params.productId, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.update_news = (req, res) => {
  News.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.delete_news = (req, res) => {
  News.remove({
    _id: req.params.productId
  }, (err, product) => {
    if (err)
      res.send(err);
    res.json({ message: 'News successfully deleted' });
  });
};
