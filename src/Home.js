import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <span>
      To get started, edit <code>src/App.js</code> and save to reload.
      <Link to="/second-page/">Second page</Link>
    </span>
  )
};
