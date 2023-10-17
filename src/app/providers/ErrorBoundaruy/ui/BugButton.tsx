import React, { useEffect, useState } from 'react'


// Компонент для тестирования прокидывания ошибок
const BugButton = () => {
  const [error, setError] = useState(false)

  const onThrow = () => {
    setError(true)
  }

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  return (
    <div>
      <button onClick={onThrow}>Прокинуть ошибку</button>
    </div>
  )
}

export default BugButton
