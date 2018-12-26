const cors = require('cors');
const getDb = require('../core/get-db');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {ELLEN_PORT} = require('./constants');
const schema = require('./schema');

const app = express();

async function start () {
  try {
    const db = await getDb();

    app.use('/graphql', graphqlHTTP({
      schema,
      'context': {db},
      'graphiql': true
    }));

    app.listen(ELLEN_PORT, () => {
      console.log('Server listening on port ' + ELLEN_PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

app.use(cors());

start();
