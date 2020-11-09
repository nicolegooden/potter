import React, { Component } from 'react';
import './SpellsContainer.css'
import { getSpells } from '../apiCalls';

class SpellsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpells: [],
      mySpells: [],
      error: '',
      currentSearch: '',
      matchingSpells: []
    }
  }

  componentDidMount() {
    getSpells().then((spells) => this.setState({allSpells: spells}))
  }

  displayAllSpellCards = () => {
    if (this.state.allSpells) {
    return this.state.allSpells.map(spell => {
      return (
        <article className='spell-card'>
          <h1 className='spell-detail spell-title'>{spell.spell}</h1>
          <h1 className='spell-detail'>{spell.type}</h1>
          <h1 className='spell-detail'>{spell.effect}</h1>
          <button id={`add button for ${spell.spell}`} className='add-spell-button'>add</button>
        </article>
      )
    })
   }
  }

  showMessageForMySpells = () => {
    if (this.props.myCharacter && this.state.mySpells.length > 0) {
      const firstName = this.props.myCharacter.name.split(' ')[0];
      return (<h1 className='spells-message'>{`${firstName}'s Spells`}</h1> ) 
    } else if (this.props.myCharacter) {
      return <h1 className='spells-message'>Your inventory is empty</h1>  
    } else {
      return <h1 className='spells-message'>Please get assigned a house and choose a character to start saving spells!</h1>  
    }
  }

  browseSpells = () => {
    this.setState({error: ''});
    let formattedSearch = this.state.currentSearch.toLowerCase();
    let matchingSpells = this.state.allSpells.filter(spell => {
      return spell.spell.toLowerCase().includes(formattedSearch);
    })
    if (matchingSpells.length === 0) {
      matchingSpells = this.state.allSpells.filter(spell => {
        return spell.effect.toLowerCase().includes(formattedSearch);
      })
    }
    if (matchingSpells.length === 0) {
      this.setState({error: 'Sorry, no spells match your search'});
    }
    this.setState({matchingSpells: matchingSpells})
  }

  trackSearch = (event) => {
    this.setState({currentSearch: event.target.value});
  }

  render() {
    return (
      <section className='spells-container'>
        {this.showMessageForMySpells()}
        <div className='browse-input-container'>
          <h1>Browse Spells</h1>
          <label htmlFor='browse spells input field'>
            <input 
              className='browse-spells-input' 
              placeholder='search by name or effect'
              type='text'
              onChange={this.trackSearch}
            />
          </label>
          <button onClick={this.browseSpells} disabled={!this.state.currentSearch} className='search-button'>search</button>
        </div>
         <h1 className='error'>{this.state.error}</h1>
        <section className='all-spells'>
          {this.displayAllSpellCards()}
        </section>
      </section>
    )
  }
}

export default SpellsContainer;