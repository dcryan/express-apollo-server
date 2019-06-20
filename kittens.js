const url = require('url');
const express = require('express');
const mongoose = require('./mongoose');

const router = express.Router();

const kittySchema = new mongoose.Schema({
  name: String,
  color: String,
});

const Kitten = mongoose.model('Kitten', kittySchema);

router.post('/api/kittens', (req, res) => {
  const { name, color } = req.body;

  const fluffy = new Kitten({ name, color });
  fluffy.save(function(err, savedFluffy) {
    if (err) {
      console.error(err);
      res.write('error');
      res.end();
      return;
    }

    console.log(`${savedFluffy.name} is Saved`);

    res.write('success');
    res.end();
  });
});

router.get('/api/kittens', (req, res) => {
  const urlData = url.parse(req.url, true);
  const searchQuery = urlData.query;
  Kitten.find()
    .where('name', searchQuery.name)
    .select('name color')
    .exec((err, kittens) => {
      if (err) return console.error(err);
      res.write(JSON.stringify(kittens));
      res.end();
    });
});

module.exports = router;
