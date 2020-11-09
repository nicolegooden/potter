import React from 'react';

const SpellCard = (props) => {
  let button;
  if (props.myCharacter) {
      button = <button onClick={() => props.addSpell(props.spell)} className='add-spell-button'>add</button>
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