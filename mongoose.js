const mongoose = require('mongoose');

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]]][/[database][?options]]
mongoose.connect(
  'mongodb://root:example@localhost:27017/test?authSource=admin',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected');
});

module.exports = mongoose;
