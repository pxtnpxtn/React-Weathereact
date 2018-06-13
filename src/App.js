import React, { Component } from "react";
import "./App.css";

import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "2e3b4817d0c852c41dacf29a6193c9a0";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a city name."
      });
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <div className="title-container">
              <Title />
            </div>
            <div className="form-container">
              <Form getWeather={this.getWeather} />
              <Weather
                temperature={this.state.temperature}
                humidity={this.state.humidity}
                city={this.state.city}
                country={this.state.country}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
