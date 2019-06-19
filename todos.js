const url = require('url');
const express = require('express');
const mongoose = require('./mongoose');
const headers = require('./headers');

const router = express.Router();

const todoSchema = new mongoose.Schema({
  name: String,
  status: String,
});

const ToDo = mongoose.model('ToDo', todoSchema);

router.get('/api/todos', (req, res) => {
  const urlData = url.parse(req.url, true);
  const searchQuery = urlData.query;

  ToDo.find(searchQuery).exec((err, todos) => {
    if (err) return console.error(err);
    res.writeHead(200, headers);
    res.write(JSON.stringify(todos));
    res.end();
  });
});

router.post('/api/todos', (req, res) => {
  console.log('body', req.body);
  const todo = new ToDo(req.body);
  todo.save((err, savedTodo) => {
    if (err) {
      console.error(err);
      res.write('error');
      res.end();
      return;
    }

    console.log(`added ${savedTodo.name}`);

    res.writeHead(200, headers);
    res.write('success');
    res.end();
  });
});

router.put('/api/todos', (req, res) => {
  ToDo.findOne()
    .where('_id')
    .equals(req.body._id)
    .exec((error, todo) => {
      todo.status = req.body.status;
      todo.save((err, savedTodo) => {
        if (err) {
          console.error(err);
          res.write('error');
          res.end();
          return;
        }

        console.log(`added ${savedTodo.name}`);

        res.writeHead(200, headers);
        res.write('success');
        res.end();
      });
    });
});

module.exports = router;
