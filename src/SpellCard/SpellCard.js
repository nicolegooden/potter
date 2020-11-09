import React, { Component } from 'react';
import './SpellCard.css';

class SpellCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      mastery: false
    }
  }

  determineDetails = () => {
  if (this.props.myCharacter && !this.props.mySpells.includes(this.props.spell)) {
    return <button onClick={() => this.props.addSpell(this.props.spell)} className='add-spell-button'>add</button>
  } else if (this.props.myCharacter && this.props.mySpells.includes(this.props.spell)) {
    return (
      <article className='saved-info'>
        <h1 className='progress'>Points:</h1>
        <h1 className='mastery'>Mastery:</h1>
        <button onClick={() => this.props.declarePracticeSpell(this.props.spell)} className='practice-spell-button'>practice</button>
      </article>
    )
  }
}

  render() {
  return (
    <article className='spell-card'>
      <h1 className='spell-detail spell-title'>{this.props.spell.spell}</h1>
      <h1 className='spell-detail'>{this.props.spell.type}</h1>
      <h1 className='spell-detail'>{this.props.spell.effect}</h1>
      {this.determineDetails()}
    </article>
  )
  }
}

export default SpellCard;