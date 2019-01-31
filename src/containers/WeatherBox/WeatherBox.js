import React, { Component } from 'react';

import SearchCity from '../../components/SearchCity/SearchCity';
import styles from './WeatherBox.module.css';

const APIKey = 'd51e075ba6694ea2f6e480ed41f66ee7';

class WeatherBox extends Component {

  state = {
    city: "Kraków",
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

  componentDidMount(){
    // first fetch - default city in app is Kraków
    this.fetchData();
  }

  componentDidUpdate(prevProps,prevState){
    if (prevState.city !== this.state.city){
      this.fetchData();
    }
  }

   render() {

    const {city, isCityCorrect, weather} = this.state;

    return (
      <div>  
        <SearchCity city={city} handleChange={this.handleChange} />
        {isCityCorrect ? 
          <ul className={styles.result}>
            <li><strong>Miasto:</strong> {city}</li>
            <li><strong>Temperatura:</strong> {weather.temperature}&#8451;</li>
            <li><strong>Wilgotność:</strong> {weather.humidity}%</li>
            <li><strong>Wschód słońca:</strong> {weather.sunrise}</li>
            <li><strong>Zachód słońca:</strong> {weather.sunset}</li>
          </ul>
        :
          <p>Podaj prawidłową nazwę miasta</p>
        }
      </div>
    );
  }
}

export default WeatherBox;
