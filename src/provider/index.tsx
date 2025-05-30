import type { ServerAction } from '@/types'
import { createContext, useContext } from 'react'

interface GenerativeContextProps {
  endpoint?: string
  serverAction?: ServerAction
}

const GenerativeContext = createContext<GenerativeContextProps>({})

interface Props {
  endpoint?: string
  serverAction?: ServerAction
}

export const GenerativeProvider = ({
  endpoint,
  serverAction,
  children,
}: Props & { children?: React.ReactNode }) => {
  return (
    <GenerativeContext.Provider value={{ endpoint, serverAction }}>
      {children}
    </GenerativeContext.Provider>
  )
}

export const useGenerativeContext = () => {
  const context = useContext(GenerativeContext)
  if (!context) {
    return null
  }
  return context
}
