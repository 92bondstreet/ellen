import gql from 'graphql-tag';
import Issue from './components/Issue';
import {Link} from 'react-router-dom';
import Loader from './components/Loader';
import React from 'react';
import {Query} from 'react-apollo';

const RANDOM = gql`
 query Random($year: Int)
  {
    random(year: $year) {
      title
      tldr
      url
    }
  }
`;

const COUNT = gql`
  { count }
`;

const YEARS = gql`
  { years }
`;

const Post = props => {
  return (
    <Query query={RANDOM}  variables={props}>
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

const Footer = () => {
  return (
    <Query query={YEARS}>
      {({data, error, loading}) => {
        if (loading || error) {
          return null;
        }

        return (
          <div className="footer">
            <p>
              {data.years.sort().map(year =>
                // Without the `key`, React will fire a key warning
                <React.Fragment key={year}>
                  <Link to={`/${year}`}>{year}</Link>
                </React.Fragment>
              )}
            </p>
          </div>
        );
      }}
    </Query>
  );
};

export default ({match}) => {
  const {id = (new Date()).getFullYear()} = match.params;

  return (
    <div className="container">
      <div className="top">
        <h1 className="emoji"><span role="img" aria-labelledby="Woman Astronaut">👩‍🚀</span></h1>
      </div>
      <div className="post">
        <Post year={+id}/>
      </div>
      <Timeline />
      <Footer />
    </div>
  );
};
