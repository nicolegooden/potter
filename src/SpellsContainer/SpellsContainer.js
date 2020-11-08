import React, { Component } from 'react';
import { getSpells } from '../apiCalls';

class SpellsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpells: [],
      mySpells: []
    }
  }

  componentDidMount() {
    getSpells().then((spells) => this.setState({allSpells: spells}))
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

  render() {
    return (
      <section>
        {this.showMessageForMySpells()}
        <h1>Browse Spells</h1>
        <button>view all spells</button>
      </section>
    )
  }
}

export default SpellsContainer;