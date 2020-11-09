import React, { Component } from 'react';
import './SpellsContainer.css'
import SpellCard from '../SpellCard/SpellCard';
import { getSpells } from '../apiCalls';

class SpellsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpells: [],
      error: '',
      currentSearch: '',
      matchingSpells: [],
      allSpellsDisplayed: true,
    //   spellToPractice: null,
    }
  }

  componentDidMount = async () => {
    await getSpells().then((spells) => this.setState({allSpells: spells}))
    this.state.allSpells.forEach(spell => {
      spell.points = 0;
      spell.mastery = false;
    })
  }

  displayAllSpellCards = () => {
    if (this.state.allSpells && this.state.matchingSpells.length === 0 && this.state.allSpellsDisplayed) {
    return this.state.allSpells.map(spell => {
      return (
        <SpellCard 
          key={spell._id}
          spell={spell}
          myCharacter={this.props.myCharacter}
          addSpell={this.props.addSpell}
          mySpells={this.props.mySpells}
          declarePracticeSpell={this.props.declarePracticeSpell}
        />
      )})
   } else {
     return this.state.matchingSpells.map(match => {
       return (
        <SpellCard 
          key={match._id}
          spell={match}
          myCharacter={this.props.myCharacter}
          addSpell={this.props.addSpell}
          mySpells={this.props.mySpells}
          declarePracticeSpell={this.props.declarePracticeSpell}
      />
       )})}
  }

  showMessageForMySpells = () => {
    if (this.props.myCharacter && this.props.mySpells.length > 0) {
      const firstName = this.props.myCharacter.name.split(' ')[0];
      return (<h1 className='spells-message'>{`${firstName}'s Spells`}</h1> ) 
    } else if (this.props.myCharacter) {
      return <h1 className='spells-message'>Your inventory is empty</h1>  
    } else {
      return <h1 className='spells-message'>Please get assigned a house and choose a character to start saving spells!</h1>  
    }
  }

  browseSpells = () => {
    this.setState({allSpellsDisplayed: false, error: ''})
    let formattedSearch = this.state.currentSearch.toLowerCase();
    let matchingSpells = this.state.allSpells.filter(spell => {
      return spell.spell.toLowerCase().includes(formattedSearch) || 
        spell.effect.toLowerCase().includes(formattedSearch) || 
        spell.type.toLowerCase().includes(formattedSearch);
    })
    if (matchingSpells.length === 0) {
      this.setState({error: 'Sorry, no spells found.  Try searching by name, effect, or type!', matchingSpells: []});
    } else {
      this.setState({matchingSpells: matchingSpells})  
    }
    this.clearInput();
  }

  trackSearch = (event) => {
    this.setState({currentSearch: event.target.value});
  }

  viewAllSpells = () => {
    this.setState({allSpellsDisplayed: true, error: '', matchingSpells: []});
  }

  showSavedSpells = () => {
    if (this.props.mySpells.length > 0) {
      return this.props.mySpells.map(saved => {
        return (
          <SpellCard 
            key={saved._id}
            spell={saved}
            myCharacter={this.props.myCharacter}
            addSpell={this.props.addSpell}
            mySpells={this.props.mySpells}
            declarePracticeSpell={this.props.declarePracticeSpell}
         />
        )
      })} 
  }

//   declarePracticeSpell = (spell) => {
//     this.setState({spellToPractice: spell})
//   }

  practiceSpell = () => {
    if (this.props.spellToPractice && this.state.currentSearch === '') {
    let resultOptions = [
      `Such rubbish!`,
      `Fair attempt!`,
      `You're a wizard, ${this.props.myCharacter.name}!`, 
    ]
    const result = Math.floor(Math.random() * resultOptions.length)
    return (
      <article className='practice-card'> 
        <h1 className='spell-name'>{this.props.spellToPractice.spell}</h1>
        <h1 className='practice-result'>{resultOptions[result]}</h1>
        <h1 className='practice-points'>{`${result + 1} point(s) awarded`}</h1>
        <button onClick={() => this.props.logPoints(result, this.props.spellToPractice)} className='exit-practice'>log points & exit</button>
      </article>
    )
    }
  } 

  clearInput = () => {
    this.setState({currentSearch: ''});
  }

  render() {
    return (
      <section className='spells-container'>
        {this.showMessageForMySpells()}
        <section className='all-saved-spells'>
          {this.showSavedSpells()}
          {this.practiceSpell()}
        </section>
        <div className='browse-input-container'>
          <h1>Browse Spells</h1>
          <label htmlFor='browse spells input field'>
            <input 
              className='browse-spells-input' 
              placeholder='search by name, effect, or type'
              type='text'
              value={this.state.currentSearch}
              onChange={this.trackSearch}
            />
          </label>
          <button 
            onClick={this.browseSpells} 
            disabled={!this.state.currentSearch} 
            className='search-button'
            >search</button>
            <button onClick={this.viewAllSpells} className='view-all-button'>view all</button>
        </div>
         <h3 className='error'>{this.state.error}</h3>
        <section className='all-spells'>
          {this.displayAllSpellCards()}
        </section>
      </section>
    )
  }
}

export default SpellsContainer;