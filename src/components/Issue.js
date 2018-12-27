import React from 'react';

export default ({data}) => {
  return (
    <div className="post">
      <h2><a
        href={data.random.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.random.title}
      </a></h2>
      <p>
        {data.random.tldr}
      </p>
    </div>
  );
};
