import React, { Component } from 'react';

class SpellsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  showMessageForMySpells = () => {
    if (this.props.myCharacter) {
      const firstName = this.props.myCharacter.name.split(' ')[0];
      return <h1 className='spells-message'>{`${firstName}'s Spells`}</h1>  
    } else {
      return <h1 className='spells-message'>Please get assigned a house and choose a character to start saving spells!</h1>  
    }
  }

  render() {
    return (
      <section>
        {this.showMessageForMySpells()}
        <h1>Spells Inventory</h1>

      </section>
    )
  }
}

export default SpellsContainer;