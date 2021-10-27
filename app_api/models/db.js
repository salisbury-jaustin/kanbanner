const mongoose = require('mongoose');
//const dbURI = 'mongodb://admin:Builder90)@localhost:27017/kanbanner';
const dbURI = 'mongodb+srv://admin:Builder90@salisbury-dvlpr.4bxma.mongodb.net/kanbanner?retryWrites=true&w=majority'
require('./user');

mongoose.connect(dbURI, {useNewUrlParser: true});

/* Connection Messages */
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
})
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose Disconnected');
})
/* End Connection Messages */

/* Disconnection conditions when app terminates */
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on ('SIGINT', () => {
      process.emit("SIGINT");
    });
  }
  
  const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
    });
  };
  
  process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
  });
  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0);
    });
  });
  process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
      process.exit(0);
    });
  });
  /* End of disconnection conditions */