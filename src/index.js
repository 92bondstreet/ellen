import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {GRAPHQL_URI} from './constants';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './container';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  'uri': GRAPHQL_URI
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
