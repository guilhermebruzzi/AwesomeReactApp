import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, browserHistory, RoutingContext, match } from 'react-router';
import { createMemoryHistory } from 'history';
import routes from './routes';
import './index.css';

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('root')
  )
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);
  const layout = locals.templateContent; // Passed from static-pages-plugin

  const generatePage = pageContent => {
    return layout.replace('{# PAGE_CONTENT #}', pageContent);
  };

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    try {
      const templateResponse = renderToString(<RoutingContext {...renderProps} />);
      callback(null, generatePage(templateResponse));
    } catch (err) {
      console.error('index.js error', err);
      callback(err);
    }
  });
};
