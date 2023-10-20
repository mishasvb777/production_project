import { fireEvent, screen } from '@testing-library/react'
import { withTranslation } from 'react-i18next';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import Counter from './Counter';


describe('Counter', () => { 
  test('test render', () => {   
    componentRender(<Counter />, {
      initialState: {counter: {value: 10}}
    });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10'); // базовый тест чтто бы проверить что значение получается из стейта
  }),

  test('increment', () => {   
    componentRender(<Counter />, {
      initialState: {counter: {value: 10}}
    });
    fireEvent.click(screen.getByTestId('increment-btn'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('11'); 
  }),
  
  test('decrement', () => {   
    componentRender(<Counter />, {
      initialState: {counter: {value: 10}}
    });
    fireEvent.click(screen.getByTestId('decrement-btn'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('9'); 
  }) 

})