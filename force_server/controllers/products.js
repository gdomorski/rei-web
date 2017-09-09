const mongoose = require('mongoose'),
      Product = require("../models/products")//mongoose.model('Products')

exports.list_all_products = (req, res) => {
  Product.find({}, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.create_a_product = (req, res) => {
  var new_product = new Product(req.body);
  new_product.save((err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.read_a_product = (req, res) => {
  Product.findOne({ slug: req.params.slug }, (err, product) => {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.update_a_product = (req, res) => {
  Product.findOneAndUpdate({ slug: req.params.slug }, req.body, {new: true}, (err, product) => {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.delete_a_product = (req, res) => {
  Product.remove({
    _id: req.params.productId
  }, (err, product) => {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};
