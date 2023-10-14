import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider'

// Оборачиваем все прилоджения в BrowserRouter для того что бы роутинг работал
render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
