import React, {Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import CardGrid from './CardGrid';
import CardDetails from "./CardDetails";
const FourOhFour = () => <h1>404</h1>;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {dogs: [], modal: [], appNeedsRefresh: false};

    this.reloadApp = this.reloadApp.bind(this);
    this.fetchDogs = this.fetchDogs.bind(this);
    this.getDogs = this.getDogs.bind(this);
    this.getModal = this.getModal.bind(this);
    this.Timer = this.Timer.bind(this);
    this.convertUnicode = this.convertUnicode.bind(this);
  }

  // Object to handle data refresh interval
  Timer(fn, t) {
    let timerObj = setInterval(fn, t);

    this.stop = function() {
      if (timerObj) {
        clearInterval(timerObj);
        timerObj = null;
      }
      return this;
    }
    // start timer using current settings (if it's not already running)
    this.start = function() {
      if (!timerObj) {
        this.stop();
        timerObj = setInterval(fn, t);
      }
      return this;
    }
    this.restart = function() {
      return this.stop().start();
    }
    // start with new interval, stop current interval
    this.reset = function(newT) {
      t = newT;
      return this.stop().start();
    }
  }

  reloadApp() {
    this.setState({appNeedsRefresh: true});
    this.fetchDogs();
  }

  getDogs() {
    return axios.get('https://www.animalhumanesociety.org/touchscreen/adoptables?_format=json');
  }

  getModal() {
    return axios.get('https://www.animalhumanesociety.org/touchscreen/pages?_format=json');
  }

  fetchDogs() {
    this.setState({appNeedsRefresh: false});
    return axios.all([this.getDogs(), this.getModal()])
      .then(axios.spread((dogs, modal) => {
        this.setState({dogs: dogs.data});
        this.setState({modal: modal.data});
      }))
      .catch(error => console.log(error));
  }


  convertUnicode(input) {
    return input.replace(/\\u(\w\w\w\w)/g,function(a,b) {
      var charcode = parseInt(b,16);
      return String.fromCharCode(charcode);
    });
  }

  componentDidMount(props) {
    this.fetchDogs();

    // Start timer to fetch new data every 5 minutes unless app is being interacted with
    this.refreshTimer = new this.Timer(this.reloadApp, 300000);
    window.addEventListener('click', () => { this.refreshTimer.restart(); }, true);
  }

  render() {
    return (

      <BrowserRouter>
        <div className="main-container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (this.state.dogs.length === 0) {
                 return (
                   <div className="card-grid-front">
                     <p className="text-center w-100 text-medium color-teal"> Loading...</p>
                   </div>
                  );
                } else {
                  return (
                    <div className="card-grid-front">
                      <CardGrid dogs={this.state.dogs}/>
                    </div>
                  );
                }
              }}
              />
            <Route
              path="/dog/:id"
              render={(props) => {
                if (this.state.appNeedsRefresh) {
                  return <Redirect to="/"/>
                } else {
                  const selectedDog = this.state.dogs.find(dog => props.match.params.id === dog.field_petpoint_id);
                  return <CardDetails dog={selectedDog}
                                    decode={this.convertUnicode}
                                    fetchDogs={this.fetchDogs}
                                    allDogs={this.state.dogs}
                                    modal={this.state.modal} {...props} />;
                }
              }}


              // component={props => {
              //   const selectedDog = this.state.dogs.find(dog => props.match.params.id === dog.field_petpoint_id);
              //   return <CardDetails dog={selectedDog} decode={this.convertUnicode} fetchDogs={this.fetchDogs} allDogs={this.state.dogs} modal={this.state.modal} {...props} />;
              // }}
            />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('reactApp'));
