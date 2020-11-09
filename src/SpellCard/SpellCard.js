import React from 'react';
import './SpellCard.css';

const SpellCard = (props) => {
  let button;
  let savedInfo;
  if (props.myCharacter && !props.mySpells.includes(props.spell)) {
      button = <button onClick={() => props.addSpell(props.spell)} className='add-spell-button'>add</button>
  } else if (props.myCharacter && props.mySpells.includes(props.spell)) {
    button = <button onClick={() => props.declarePracticeSpell(props.spell)} className='practice-spell-button'>practice</button>
    savedInfo = (
      <article className='saved-info'>
        <h1 className='progress'>Points:</h1>
        <h1 className='mastery'>Mastery:</h1>
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