export type PlanetsType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: [],
  created: string
  edited: string
  url: string
};

export type ContextType = {
  contextAPI: () => void,
  planetData: PlanetsType[],
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
};
