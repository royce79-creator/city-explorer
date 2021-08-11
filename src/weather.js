import React from 'react'

class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.weatherData.map((weather, index) => {
          return (<div key={index}>
            <p>{weather.description}</p>
            <p>{weather.date}</p>
          </div>)
        })}

      </>
    )
  }
}

export default Weather;
