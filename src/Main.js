import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: 0,
      lon: 0,
      results: false,

    }
  }

  handleChange = (event) => {
    this.setState({
      city: event.target.value
})
    
  }

  handleSubmitCity = (event) => {
  }
  render() {
    console.log(this.state.city);
    return(
      <>
        <h1>In the main guy</h1>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label>
                <Form.Control as="input" onChange={this.handleChange}>

                </Form.Control>
              </Form.Label>
            </Form.Group>
            <Button variant="outline-success">Expore!</Button>
          </Form>
        </Container>
      </>

    )
  }
}

export default Main;
