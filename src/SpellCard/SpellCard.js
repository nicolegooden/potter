import React from 'react';
import './SpellCard.css';
import PropTypes from 'prop-types';

const SpellCard = (props) => {
  let button;
  let savedInfo;

  let mySpellIndex = props.mySpells.findIndex(spell => {
    return spell.spell === props.spell.spell;
  })

  if (props.myCharacter && mySpellIndex === -1) {
    button = <button data-testid={`add button for ${props.spell.key}`} onClick={() => props.addSpell(props.spell)} className='add-spell-button'>add</button>
  } else if (props.myCharacter) {
    let mastery;
    props.spell.points >= 15 ? mastery = 'Congrats! Fully mastered!' : mastery = 'Not yet mastered';
     savedInfo = (
      <article className='saved-info'>
        <h1 className='progress'>Points: {props.mySpells[mySpellIndex].points}</h1>
        <h1 className='mastery'>{mastery}</h1>
        <button data-testid={`practice button for ${props.spell.key}`} onClick={() => props.declarePracticeSpell(props.spell)} className='practice-spell-button'>practice</button>
      </article>
    )
  }

  return (
    <article className='spell-card'>
      <h1 className='spell-detail spell-title'>{props.spell.spell}</h1>
      <h1 className='spell-detail'>{props.spell.type}</h1>
      <h1 className='spell-detail'>{props.spell.effect}</h1>
      {savedInfo}
      {button}
    </article>
  )
}

export default SpellCard;

SpellCard.propTypes = {
  spell: PropTypes.object.isRequired,
  myCharacter: PropTypes.object,
  addSpell: PropTypes.func,
  mySpells: PropTypes.array,
  declarePracticeSpell: PropTypes.func
}