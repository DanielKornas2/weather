import React, { Component } from 'react';

import ClickButton from '../../components/ClickButton/ClickButton';
import SearchCity from '../../components/SearchCity/SearchCity';

class WeatherBox extends Component {
  render() {
    return (
      <div>
        <SearchCity />
        <ClickButton />
      </div>
    );
  }
}

export default WeatherBox;
