import React from "react";
import logo from "./logo.svg";
import "./App.css";
import bg from "./assets/DayBackground.png";
import bg2 from "./assets/NightBackground.png";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SelectDropDownComponent from "./dropdown";
import { connect } from "react-redux";
import { updateWeather } from "./redux/index";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      errorMessage: "",
      locationData: "",
      typeOfWeather: "",
    };
  }
  componentDidMount() {
    console.log("inside component mount");
    var url = "http://localhost:3000/api";
    console.log(this.state);
  }
  fetchWeather = async () => {
    var weather = {};
    //var url2="http://api.weatherstack.com/current?access_key=1b6fdda898c99d874820e27ed6aa564a&query="+this.state.city;
    var url3 = "http://localhost:3000/city/" + this.state.city;
    console.log("inside fetch weather");
    /* let response = await fetch(url3)                                          chaining also can be used using .then 
  .then(response=>response.json())
  .then(data=>console.log("response is ",data))
 .then(data=>this.setState({weatherData:data}))
 */
    let response = await fetch(url3);
    let resjson = await response.json();
    let errorObj;
    let errorMessage;
    console.log(resjson);
    if (!resjson.current) {
      if (resjson.success == false) {
        console.log("api req failed");
        errorMessage = "City name is invalid";
        this.setState({ errorMessage: errorMessage });
      }
    } else {
      let location = await resjson.location;
      let current = await resjson.current;
      let pressure = await current.pressure;
      console.log("pressure is " + pressure);
      this.setState({ weatherData: current }); /* Redux Dispatch Function */
      this.props.updateWeatherData(current);
      this.setState({ locationData: location });
    }
  };
  handleSubmit = async () => {
    //event.preventDefault()
    console.log("the city is" + this.state.city);
    this.fetchWeather();
  };
  hangledropdownChange = async (e) => {
    await this.setState({
      city: e.value,
    });
    this.handleSubmit();
  };
  //function to fetch weather on submit button of form that has input text box
  /*
handleChange=async(event)=>{
console.log(event.target.value)
this.setState({city:event.target.value});
}
*/
  render() {
    // console.log("Hi", this.props.weatherData);
    // let { error } = this.state.errorMessage;
    // console.log("error is" + error);
    let isday = false;

    if (this.props.weatherData.is_day == "yes") {
      isday = true;
      // bgimage=bg
      //console.log(bg)
    } else {
      isday = false;
    }
    console.log(isday);
    //console.log(bg)
    //let {pressure}=this.state.weatherData.pressure
    /* let renderError=()=>{
    if(error!= undefined){
      return(
        <p>Please type the correct city name</p>
      )
    }
    else{
      return(
      <h1>Pressure : {this.state.weatherData.pressure}</h1>
      )
    }
    
  }*/
    let sunny = true;

    let renderWeatherIcon = () => {
      let typeOfWeather = "";
      console.log(this.props.weatherData.weather_descriptions);
      let weatherDes = this.props.weatherData.weather_descriptions;
      if (weatherDes) {
        weatherDes.map((type) => {
          typeOfWeather = type;
          console.log("type of weather is " + typeOfWeather);
        });
      }
      if (typeOfWeather === "Sunny" || typeOfWeather === "Clear") {
        return (
          <img className="weather-type" src={require("./assets/sunny.jpg")} />
        );
      } else {
        return (
          <img
            className="weather-type"
            src={require("./assets/lowcloud.jpg")}
          />
        );
      }
    };

    return (
      <div
        className="App"
        style={{ backgroundImage: isday ? `url(${bg})` : `url(${bg2})` }}
      >
        <div className="container">
          <div className="dropdown">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <Select
                  options={Countries}
                  defaultValue={{ label: "Select City", value: 0 }}
                  onChange={(e) => {
                    this.hangledropdownChange(e);
                  }}
                />
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>

        {
          // Text input box alternative to dropdown
          /*   <div className="inputBox">
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.city} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>*/
        }
        <div className="result">
          <div className="info1">
            <div className="country-info-wind">
              <div className="country">
                <p>Country : {this.state.locationData.country}</p>
                <p>Region : {this.state.locationData.region}</p>
              </div>
              <div className="wind">
                <h3>
                  Wind <img src={require("./assets/Wind Icon.png")} />{" "}
                </h3>

                <p>Wind Speed: {this.props.weatherData.wind_speed}</p>
                <p>Wind Degree : {this.props.weatherData.wind_degree}</p>
                <p>Wind Dir {this.props.weatherData.wind_dir}</p>
              </div>
            </div>
            <div className="city-info">
              <div className="grey-box">
                <h2>{this.state.locationData.name}</h2>
                <p>{renderWeatherIcon()}</p>
                <p>{this.props.weatherData.weather_descriptions}</p>
                <p className="temperature">
                  {" "}
                  <img src={require("./assets/Temp icon.png")} />{" "}
                  {this.props.weatherData.temperature} °C
                </p>
              </div>
            </div>
            <div className="time-zone">
              <p>Time Zone: {this.state.locationData.timezone_id} </p>
              <p>localtime : {this.state.locationData.localtime}</p>
              <p>Feels like: {this.props.weatherData.feelslike} °C</p>
            </div>
          </div>
          <div className="info2">
            <div className="weather-icons">
              <div className="subitem">
                <p>{this.state.locationData.lat}</p>
                <p>
                  <img src={require("./assets/Latitude icon.png")} />
                </p>
                <p>Latitude</p>
              </div>
              <div className="subitem">
                <p>{this.state.locationData.lon}</p>
                <p>
                  <img src={require("./assets/Longitude.png")} />
                </p>
                <p>Longitude</p>
              </div>
              <div className="subitem">
                <p>{this.props.weatherData.visibility}</p>
                <p>
                  <img src={require("./assets/Visibility.png")} />
                </p>
                <p>Visibility</p>
              </div>
              <div className="subitem">
                <p>{this.props.weatherData.cloudcover}</p>
                <p>
                  <img src={require("./assets/Clould Cover.png")} />
                </p>
                <p>Cloud cover</p>
              </div>
              <div className="subitem">
                <p>{this.props.weatherData.humidity}</p>
                <p>
                  <img src={require("./assets/Humidity.png")} />
                </p>
                <p>Humidity</p>
              </div>
              <div className="subitem">
                <p>{this.props.weatherData.pressure}</p>
                <p>
                  <img src={require("./assets/Pressure.png")} />
                </p>
                <p>pressure</p>
              </div>
            </div>
            <div className="clock">clock image</div>
          </div>
        </div>
      </div>
    );
  }
}
const Countries = [
  { label: "New Delhi", value: "New Delhi" },
  { label: "Sydney", value: "Sydney" },
  { label: "New York", value: "New York" },
  { label: "London", value: "London" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Pune", value: "Pune" },
  { label: "Jaipur", value: "Jaipur" },
];
/* can add more cities to the dropdown or introduce an input text box*/

const mapStateToProps = (state) => {
  return { weatherData: state.weatherData };
};

const mapDispatchToProps = (dispatch) => {
  return { updateWeatherData: (data) => dispatch(updateWeather(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
