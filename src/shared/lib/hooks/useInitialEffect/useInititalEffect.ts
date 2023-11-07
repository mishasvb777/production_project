import { useEffect } from "react"


// основная задача этого куда это проверка для сторибука, что не вызывались лишние запросы в сторибуке

export function useInitialEffect(callback: () => void) {
  useEffect(() => {
    if(__PROJECT__ !== 'storybook'){
      callback();
    }
  }, [])
}