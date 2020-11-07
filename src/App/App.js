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
      allStudents: [],
      studentsByHouse: []
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

  getStudentsByHouse = () => {
    const studentsByHouse = this.state.allStudents.filter(student => {
      return student.house === this.state.house;
    })
    this.setState({studentsByHouse: studentsByHouse})
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
            getStudentsByHouse={this.getStudentsByHouse}
          />
        </Route>
        <Route path='/characters'>
          <CharactersContainer 
            house={this.state.house}
            studentsByHouse={this.state.studentsByHouse}
          />
        </Route>
      </main>
    )
  }
}

export default App;
