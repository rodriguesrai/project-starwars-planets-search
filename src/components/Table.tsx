import React, { useContext } from 'react';
import PlanetsContext from '../context/DataContext';

function Table() {
  const { planetData, searchTerm, setSearchTerm } = useContext(PlanetsContext);
  const filteredPlanets = planetData
    .filter((planet) => planet.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <>
      <div>
        <input
          type="text"
          value={ searchTerm }
          onChange={ (e) => setSearchTerm(e.target.value) }
          placeholder="Buscar por nome de planeta"
          data-testid="name-filter"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((value, mapIndex) => (
                <td key={ mapIndex }>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}

export default Table;
