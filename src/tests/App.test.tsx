import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando os elementos da página', () => { 
  const setup = () => {
    render(<App />);
    const colunas = screen.getAllByRole('columnheader');
    const table = screen.getByRole('table');
    const inputTerm = screen.getByTestId('name-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId("button-filter");
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');

    return { colunas, table, inputTerm, inputNumber, buttonFilter, selectColumn, selectComparison };
  };

  it('Verificando elementos da tabela', () => { 
    const { colunas, table } = setup();
    expect(colunas).toHaveLength(13);
    expect(table).toBeInTheDocument();
  });

  it('Verificando os botões de filtro', () => { 
    const { inputTerm, inputNumber, buttonFilter, selectColumn, selectComparison } = setup();
    expect(inputTerm).toBeInTheDocument();  
    expect(inputNumber).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(selectColumn).toBeInTheDocument();
    expect(selectColumn).toHaveTextContent('population');
    expect(selectComparison).toBeInTheDocument();
    expect(selectComparison).toHaveTextContent('maior que');
  });

  it('Verificando funções do filtro por nome', async () => { 
    const { buttonFilter, inputTerm } = setup();
  
    await userEvent.type(inputTerm, 'Alderaan');
  
    await waitFor(() => {
      const tatooineCell = screen.queryByRole('cell', {
        name: /tatooine/i
      });
  

      expect(tatooineCell).not.toBeInTheDocument();
    });
  });
  it('Verificando funções do filtro number e selection', () => { 
    const { buttonFilter, inputNumber, selectColumn, selectComparison } = setup();
  
    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.type(inputNumber, '100000');
    userEvent.click(buttonFilter);
  
    const tatooineCell = screen.queryByRole('cell', {
      name: /tatooine/i
    });
  
    expect(tatooineCell).not.toBeInTheDocument();
   })
});
