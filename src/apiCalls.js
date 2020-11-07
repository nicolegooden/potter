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