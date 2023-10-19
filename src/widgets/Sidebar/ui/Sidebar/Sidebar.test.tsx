import { fireEvent, screen } from '@testing-library/react'
import { withTranslation } from 'react-i18next';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import  Sidebar  from 'widgets/Sidebar/ui/Sidebar/Sidebar';


describe('Sidebar', () => { 
  test('with only first param', () => {
    const SidebarWithTranslation = withTranslation()(Sidebar)
    componentRender(<SidebarWithTranslation />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  }) 

  test('test toggle', () => {
    componentRender(<Sidebar />) // здесь мы получаем отрендеренный компонент
    const toggleBtn = screen.getByTestId('sidebar-toggle') // здесь находим кнопку у которой data-testid="sidebar-toggle"
    expect(screen.getByTestId('sidebar')).toBeInTheDocument(); // проверка, что элемент с тестовым идентификатором ‘sidebar’ существует в документе
    fireEvent.click(toggleBtn) // имитируется нажатие на кнопку с идентификатором “toggleBtn”
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed'); // проверяем что класс collapsed навесился на элемент
  }) 
})