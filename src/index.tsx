import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import 'shared/config/i18n/i18n'
import { ErrorBoundary } from 'app/providers/ErrorBoundaruy'
import Button from 'shared/ui/Button/Button'

// Оборачиваем все прилоджения в BrowserRouter для того что бы роутинг работал
render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <Button />
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
)
