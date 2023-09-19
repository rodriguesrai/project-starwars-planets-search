import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/DataContext';

function Table() {
  const { planetData, searchTerm, setSearchTerm } = useContext(PlanetsContext);
  const [filterList, setFilterList] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');

  const optionsCollumns = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [availableColumns, setAvailableColumns] = useState(optionsCollumns);

  const columnOrder = [
    'name',
    'climate',
    'diameter',
    'gravity',
    'orbital_period',
    'population',
    'rotation_period',
    'surface_water',
    'terrain',
    'films',
    'created',
    'edited',
    'url',
  ];
  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleComparisonChange = (event) => {
    setSelectedComparison(event.target.value);
  };

  const handleValueChange = (event) => {
    setFilterValue(event.target.value);
  };
  const handleRemoveAllFilters = () => {
    setFilterList([]);
  };

  const handleRemoveFilter = (column) => {
    setAvailableColumns([
      ...availableColumns,
      column,
    ]);
    const filtredFilters = filterList.filter((filter) => filter.column !== column);
    setFilterList(filtredFilters);
  };

  const handleAddFilter = () => {
    setFilterList([
      ...filterList,
      {
        column: selectedColumn,
        comparison: selectedComparison,
        value: filterValue,
      },
    ]);
    const filtredColumns = availableColumns.filter((col) => col !== selectedColumn);
    setAvailableColumns(filtredColumns);
    setSelectedColumn(filtredColumns[0]);
  };

  const filteredPlanetsByName = planetData
    .filter((planet) => planet.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredPlanets = filteredPlanetsByName.filter((planet) => {
    return filterList.every((filter) => {
      const value = parseFloat(planet[filter.column]);
      const filterValueList = parseFloat(filter.value);

      if (filter.comparison === 'maior que') {
        return value > filterValueList;
      } if (filter.comparison === 'menor que') {
        return value < filterValueList;
      } if (filter.comparison === 'igual a') {
        return value === filterValueList;
      }

      return true;
    });
  });

  return (
    <>
      <div>
        <select
          data-testid="column-filter"
          value={ selectedColumn }
          onChange={ handleColumnChange }
        >
          {availableColumns.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          value={ selectedComparison }
          onChange={ handleComparisonChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          value={ filterValue }
          onChange={ handleValueChange }
          data-testid="value-filter"
        />

        <button
          onClick={ handleAddFilter }
          data-testid="button-filter"
        >
          Adicionar Filtro
        </button>
        <input
          type="text"
          value={ searchTerm }
          onChange={ (e) => setSearchTerm(e.target.value) }
          placeholder="Buscar por nome de planeta"
          data-testid="name-filter"
        />
      </div>
      <div>
        {filterList.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button
              onClick={ () => handleRemoveFilter(filter.column) }
              data-testid="button-remove-filter"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={ handleRemoveAllFilters }
        data-testid="button-remove-filters"
      >
        Remover todas filtragens
      </button>
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
              {columnOrder.map((columnName) => (
                <td key={ columnName }>{planet[columnName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
