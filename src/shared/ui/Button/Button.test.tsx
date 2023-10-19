import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button, { ThemeButton } from 'shared/ui/Button/Button'

describe('Button', () => { 
  test('Test render', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  }) 

  test('check class name', () => {
    render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  }) 
})