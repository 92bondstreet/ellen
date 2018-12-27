import gql from 'graphql-tag';
import Issue from './components/Issue';
import Loader from './components/Loader';
import React from 'react';
import {Query} from 'react-apollo';

const RANDOM = gql`
  {
    random {
      title
      tldr
      url
    }
  }
`;

const Post = () => {
  return (
    <Query query={RANDOM}>
      {({loading, data}) => {
        if (loading) {
          return <Loader />;
        }

        return <Issue data={data}/>;
      }}
    </Query>
  );
};

export default () => {
  return (
    <div className="container">
      <div className="top">
        <h1 className="emoji"><span role="img" aria-labelledby="Woman Astronaut">👩‍🚀</span></h1>
      </div>
      <div className="post">
        <Post />
      </div>
      <div className="timeline">
        <a href="http://softwareleadweekly.com" target="_blank" rel="noopener noreferrer">2567 issues</a>
      </div>
    </div>
  );
};
