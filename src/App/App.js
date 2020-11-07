import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import { getSorted } from '../apiCalls'

class App extends Component {
  constructor() {
    super();
    this.state = {
      house: ''
    }
  }

  setHouse = () => {
    getSorted().then((houseName) => this.setState({house: houseName}))
  }

  render() {
    return (
      <main className='app-container'>
        <Header />
        <Route exact path='/'>
          <HomePage 
            house={this.state.house}
            setHouse={this.setHouse}
          />
        </Route>
      </main>
    )
  }
}

export default App;
