import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';
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

  changeHomePageButton = () => {
    if (this.state.house.length > 0) {
      return (
      <button className='house-button'>learn about {this.state.house}</button>
      ) 
    } else {
      return (
        <button onClick={this.setHouse} className='house-button'>find my house</button>
      )
    }
  }
  
  render() {
    return (
      <main className='app-container'>
        <Route exact path='/'>
          <HomePage changeHomePageButton={this.changeHomePageButton}/>
        </Route>
      </main>
    )
  }
}

export default App;
