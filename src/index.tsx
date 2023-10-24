import 'app/styles/index.scss'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import 'shared/config/i18n/i18n'
import { ErrorBoundary } from 'app/providers/ErrorBoundaruy'
import { StoreProvider } from 'app/providers/StoreProvider'

// Оборачиваем все прилоджения в BrowserRouter для того что бы роутинг работал
render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>    
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
