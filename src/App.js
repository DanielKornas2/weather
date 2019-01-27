import React, { Component } from 'react';
import './App.css';

import WeatherBox from './containers/WeatherBox/WeatherBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherBox />
      </div>
    );
  }
}

export default App;
