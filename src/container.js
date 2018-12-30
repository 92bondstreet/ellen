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

const COUNT = gql`
  { count }
`;

const Post = () => {
  return (
    <Query query={RANDOM}>
      {({data, error, loading}) => {
        if (loading || error) {
          return <Loader />;
        }

        return <Issue data={data}/>;
      }}
    </Query>
  );
};

const Timeline = () => {
  return (
    <Query query={COUNT}>
      {({data, error, loading}) => {
        if (loading || error) {
          return null;
        }

        return (
          <div className="timeline">
            <a href="http://softwareleadweekly.com" target="_blank" rel="noopener noreferrer">{data.count} issues</a>
          </div>
        );
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
      <Timeline />
    </div>
  );
};
