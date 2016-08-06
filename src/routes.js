import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import SecondPage from './SecondPage';
import Home from './Home';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/second-page" component={SecondPage}/>
  </Route>
)
