const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {ELLEN_PORT} = require('./constants');

const app = express();

async function start () {
  try {
    app.listen(ELLEN_PORT, () => {
      console.log('Server listening on port ' + ELLEN_PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

app.use(cors());
app.use('/graphql', graphqlHTTP({
}));

start();
