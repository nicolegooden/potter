import React from 'react';
import './SpellCard.css';

const SpellCard = (props) => {
  let button;
  if (props.myCharacter && !props.mySpells.includes(props.spell)) {
      button = <button onClick={() => props.addSpell(props.spell)} className='add-spell-button'>add</button>
  } else if (props.myCharacter && props.mySpells.includes(props.spell)) {
    button = <button onClick={() => props.practiceSpell(props.spell)} className='practice-spell-button'>practice</button>
  }

  return (
    <article className='spell-card'>
      <h1 className='spell-detail spell-title'>{props.spell.spell}</h1>
      <h1 className='spell-detail'>{props.spell.type}</h1>
      <h1 className='spell-detail'>{props.spell.effect}</h1>
      {button}
    </article>
  )
}

export default SpellCard;