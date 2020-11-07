const apiKey = '?key=$2a$10$2D2n5mxwx4zUWsnRGmwA.uG0fMQF5JDCqPxn7gKc.Iu2STV/3K3zW';

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
  const response = await fetch(`https://www.potterapi.com/v1/characters/${apiKey}`)
  try {
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
}