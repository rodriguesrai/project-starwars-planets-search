import { createContext } from 'react';
import { ContextType } from '../types';

const PlanetsContext = createContext<ContextType>({} as ContextType);

export default PlanetsContext;
