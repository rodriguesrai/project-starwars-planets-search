import React, { useState, ReactNode, useEffect } from 'react'; // Adicionamos 'createContext' aos imports
import { PlanetsType } from '../types';
import fetchData from '../api';
import PlanetsContext from './DataContext';

type PlanetsProviderProps = {
  children: ReactNode,
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const [planetData, setPlanetData] = useState<PlanetsType[]>([]);

  const contextAPI = async (): Promise<void> => {
    try {
      const response = await fetchData();
      setPlanetData(response);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    contextAPI();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planetData, contextAPI } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
