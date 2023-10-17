import React, { ErrorInfo, ReactNode, Suspense } from 'react'
import { withTranslation } from 'react-i18next'
import PageError from 'widgets/PageError/ui/PageError'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  // типы в классовых компонентах передаются в виде дженерика, первый пропс, второй стейт
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, info) // здесь подключается сервис для логирования ошибок
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback={''}>
          <PageError />
        </Suspense>
      ) //оборачиваем в Suspens потому что мы асинхронно подключаем переводу на компонент PageError
    }

    return this.props.children
  }
}

export default ErrorBoundary
