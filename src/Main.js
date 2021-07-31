import React from 'react'
import axios from 'axios';
import './Main.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: 0,
      lon: 0,
      showCityName: false,
      showLat: false,
      showLon: false,
      displayMap: false,

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
        city: cityMap.data[0].display_name,
        lat: cityMap.data[0].lat,
        lon: cityMap.data[0].lon,
        showLat: true,
        showLon: true,
        displayMap: true,
      })
    }
    catch (error) {
      console.log('this error', error.message);
    }
  }




  render() {
    console.log(this.state.city);
    return(
      <div id="main">
        <h1>Welcome to City Explorer, search to your heart's content!</h1>
        <Container>
          <Form onSubmit={this.handleSubmitCity}>
            <Form.Group>
              <Form.Label>
                <Form.Control as="input" onChange={this.handleChange}>    
                </Form.Control>
              </Form.Label>
            </Form.Group>
            <Button variant="outline-success" type="submit">Expore!</Button>
          </Form>
          {this.state.showCityName ? <h2>City Name: {this.state.city}</h2>: ''}
          {this.state.showLat ? <h2>Lat: {this.state.lat}</h2>: ''}
          {this.state.showLon ? <h2>Lon: {this.state.lon}</h2>: ''}
          {this.state.displayMap ? <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_APIKEY}&center=${this.state.lat},${this.state.lon}&zoom=13`} alt={this.state.city} />: ''}
        </Container>
      </div>

    )
  }
}

export default Main;

