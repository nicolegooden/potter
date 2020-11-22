export const getSorted = async () => {
  const response = await fetch('https://www.potterapi.com/v1/sortingHat')
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}

export const getCharacters = async () => {
  const response = await fetch('https://fe-cors-proxy.herokuapp.com', {
    headers: {
      'Target-URL': 'http://localhost:3001/api/v1/characters'
    }
  })
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}

export const getMyCharacter = async (characterID) => {
  const response = await fetch('https://fe-cors-proxy.herokuapp.com', {
    headers: {
      'Target-URL': `http://localhost:3001/api/v1/characters/${characterID}`
    }
  })
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}

export const getAllHouses = async () => {
  const response = await fetch('https://fe-cors-proxy.herokuapp.com', {
    headers: {
      'Target-URL': 'http://localhost:3001/api/v1/houses'
    }
  })
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}

export const getSpells = async () => {
  const response = await fetch('https://fe-cors-proxy.herokuapp.com', {
    headers: {
      'Target-URL': 'http://localhost:3001/api/v1/spells'
    }
  })
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}