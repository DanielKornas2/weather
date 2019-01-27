import React, { Component } from 'react';

import ClickButton from '../../components/ClickButton/ClickButton';
import SearchCity from '../../components/SearchCity/SearchCity';

const APIKey = '056d9a8cc94d2c14f06c00a9088864a5'

class WeatherBox extends Component {

  state = {
    city: "Kraków",
    humidity: null,
    sunrise: null,
    sunset: null,
    temperature: null,
    wind: null
  }

  fetchData = () => {

    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${APIKey}&units=metric`

    fetch (apiUrl)
      .then(response => {
        if (response.ok){ 
          return response.json()
        }
        throw Error(response.statusText);
      })
      .then(result => {
        //convert unix value to correct time
        const sunrise = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(result.sys.sunset * 1000).toLocaleTimeString();
        this.setState({
          humidity: result.main.humidity,
          sunrise: sunrise,
          sunset: sunset,
          temperature: result.main.temp,
          wind: result.wind.speed
        })
      })
      .catch(error => console.log(error))
  }

  handleClick = () => {
    console.log('works')
    // this.fetchData();
  }

  componentDidMount(){
    this.fetchData()
  }

  render() {
    return (
      <div>
        <SearchCity />
        <ClickButton handleClick={this.handleClick} />
      </div>
    );
  }
}

export default WeatherBox;
