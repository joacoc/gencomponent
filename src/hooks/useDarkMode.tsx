import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  function checkDarkMode() {
    return (
      typeof document !== 'undefined' &&
      document.body.classList.contains('dark')
    )
  }

  useEffect(() => {
    setIsDarkMode(checkDarkMode())

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(checkDarkMode())
        }
      })
    })

    mutationObserver.observe(document.body, { attributes: true })

    return () => mutationObserver.disconnect()
  }, [])

  return isDarkMode
}
