import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }
  
  render() {
    return (
      <main className='app-container'>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </main>
    )
  }
}

export default App;
