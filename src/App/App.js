import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import CharactersContainer from '../CharactersContainer/CharactersContainer';
import { getSorted, getCharacters } from '../apiCalls'

class App extends Component {
  constructor() {
    super();
    this.state = {
      house: '',
      allStudents: []
    }
  }

  componentDidMount = () => {
    this.getAllStudents();
  }

  setHouse = () => {
    getSorted().then((houseName) => this.setState({house: houseName}))
  }

  getAllStudents = () => {
    getCharacters()
    .then((characters) => {
      const students = characters.filter(char => {
        return char.role === 'student'
      })
      this.setState({allStudents: students})
    });
  }

  render() {
    return (
      <main className='app-container'>
        <Route path='/'>
          <Header />
        </Route>
        <Route exact path='/'>
          <HomePage 
            house={this.state.house}
            setHouse={this.setHouse}
          />
        </Route>
        <Route path='/characters'>
          <CharactersContainer 
            house={this.state.house}
            allStudents={this.state.allStudents}
          />
        </Route>
      </main>
    )
  }
}

export default App;
