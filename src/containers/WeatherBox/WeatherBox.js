import React, { Component } from 'react';

import ClickButton from '../../components/ClickButton/ClickButton';
import SearchCity from '../../components/SearchCity/SearchCity';

const APIKey = 'd51e075ba6694ea2f6e480ed41f66ee7';

class WeatherBox extends Component {

  state = {
    city: "",
    isCityCorrect: true,
    weather: {
      humidity: null,
      sunrise: null,
      sunset: null,
      temperature: null,
      wind: null
    } 
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
          isCityCorrect: true,
          weather: {
            humidity: result.main.humidity,
            sunrise: sunrise,
            sunset: sunset,
            temperature: result.main.temp,
            wind: result.wind.speed
          }
        })
      })
      .catch(error => {
        this.setState(prevState => ({
          isCityCorrect: false,
          city: prevState.city
        }))
        console.log(error)
      })
  }

  handleChange = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('click')
    
    this.fetchData();
    
  }

   render() {

    const {city, weather} = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <SearchCity city={city} handleChange={this.handleChange} />
        <ClickButton />
        </form>
        {weather.humidity ? 
          <ul>
            <li>{city}</li>
            <li>{weather.temperature}</li>
            <li>{weather.humidity}%</li>
          </ul>
        :
          <p>Podaj prawidłową nazwę miasta</p>
        }
      </div>
    );
  }
}

export default WeatherBox;
