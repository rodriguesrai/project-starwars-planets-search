async function fetchData() {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    const data = await response.json();
    const planets = data.results.map((planet) => {
      const { residents, ...rest } = planet;
      return rest;
    });
    return planets;
  } catch (error) {
    console.error('Erro na solicitação à API:', error);
    throw error;
  }
}

export default fetchData;
