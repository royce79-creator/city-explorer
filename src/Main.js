import React from 'react'
import axios from 'axios';
import './Main.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Weather from './weather.js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: 0,
      lon: 0,
      showCityName: false,
      displayMap: false,
      displayError: false,
      errorMsg: '',
      displayWeather:false,
      weatherData: [],
    }
  }

  handleChange = (event) => {
    this.setState({
      city: event.target.value
})
    
  }

  handleSubmitCity = async (e) => {
    e.preventDefault();
    try {
      let cityMap = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_APIKEY}&q=${this.state.city}&format=json`);
      console.log(cityMap.data[0]);

      this.setState ({
        showCityName: true,
        cityDisplay: cityMap.data[0].display_name,
        lat: cityMap.data[0].lat,
        lon: cityMap.data[0].lon,
        displayMap: true,
      })
    }
    catch (error) {
      this.setState({
        displayError: true,
        errorMsg: `Error Present: ${error.response.status}, ${error.response.data.error}`

      })
      console.log('this error', error.message);
    }
    this.handleWeatherCity();
  }
    handleWeatherCity = async () => {
      try {
        let weatherCity = await axios.get(`http://localhost:3001/weather?searchQuery=${this.state.city}`)
        
        // console.log(weatherCity);
        this.setState({
          displayWeather: true,
          weatherData: weatherCity.data,
        })
      }
      catch (error) {
        this.setState({
          displayError: true,
          errorMsg: `Error has occured: ${error.response.status}, ${error.response.data.error ? error.response.data.error : ''}`
        })
        console.log('this error 2', error.message);
      }
    }

  render() {
    // console.log(this.state.city);
    return(
      <div>
        <h1>Welcome to City Explorer, search to your heart's content!</h1>
        <Container id="container1">
          <Form onSubmit={this.handleSubmitCity}>
            <Form.Group>
              <Form.Label>
                <Form.Control as="input" onChange={this.handleChange}>    
                </Form.Control>
              </Form.Label>
            </Form.Group>
            <Button id="explore" variant="secondary" block type="submit">Explore!</Button>{' '}
          </Form>
          {this.state.showCityName ? <h2>City Name: {this.state.city}</h2> : ''}
          {this.state.lat ? <h2>Lat: {this.state.lat}</h2> : ''}
          {this.state.lon ? <h2>Lon: {this.state.lon}</h2> : ''}
          {this.state.displayMap ? <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_APIKEY}&center=${this.state.lat},${this.state.lon}&zoom=13`} alt={this.state.city} /> : ''}
          {this.state.errorMsg ? <h2>{this.state.errorMsg}</h2> : ''}
          {this.state.weatherData.length ? <Card style={{width: '18rem'}}>
            <Card.Header>The Temperatures</Card.Header>
              <ListGroup variant="flush">
              <ListGroup.Item>{this.state.displayWeather ? <Weather weatherData={this.state.weatherData}/> : ''}</ListGroup.Item>
              </ListGroup>
          </Card> : ''}
        </Container>
      </div>

    )
  }
}

export default Main;

