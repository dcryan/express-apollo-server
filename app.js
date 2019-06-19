const express = require('express');

const app = express();
const port = 4000;
const headers = require('./headers');

// create application/json parser
app.use(express.json()); // to support JSON-encoded bodies

app.get('/', (req, res) => res.send('Hello World!'));
app.options('/api/todos', (req, res) => {
  res.writeHead(204, headers);
  res.end();
});

app.use(require('./todos'));
app.use(require('./kittens'));

app.listen(port, () =>
  console.log(`Server ready at http://localhost:${port}!`)
);

console.log('listening on port 4000...');
