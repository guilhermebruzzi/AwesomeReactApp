import React, { Component } from 'react';
import styles from './SecondPage.css';
import CSSModules from 'react-css-modules';

class App extends Component {
  render() {
    return (
      <div styleName="second-page">
        This is the second page.
      </div>
    );
  }
}

// eslint-disable-next-line
export default CSSModules(App, styles);
