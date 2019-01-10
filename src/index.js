import App from './container';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {GRAPHQL_URI} from './constants';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const client = new ApolloClient({
  'uri': GRAPHQL_URI
});

ReactDOM.render(<ApolloProvider client={client}>
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:id" component={App} />
    </Switch>
  </Router>
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
