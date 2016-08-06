import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';
import CSSModules from 'react-css-modules';

class App extends Component {
  render() {
    return (
      <div styleName="app">
        <div styleName="app-header">
          <img src={logo} styleName="app-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div styleName="app-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line
export default CSSModules(App, styles);
