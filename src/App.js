import gql from 'graphql-tag';
import Loader from './Loader';
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

export default () => {
  return (
    <Query query={RANDOM}>
      {({loading, error, data}) => {
        if (loading) {
          return <Loader />;
        }

        return (
          <div>
            <a
              href={data.random.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.random.title}
            </a>
            <p>
              {data.random.tldr}
            </p>
          </div>
        );
      }}
    </Query>
  );
};
