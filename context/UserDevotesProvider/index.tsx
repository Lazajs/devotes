import { createContext, useState } from "react"
import { TDevote } from "@/types"

interface ContextValue {
  userDevotes: TDevote[] | undefined
  setUserDevotes: React.Dispatch<React.SetStateAction<TDevote[] | undefined>>
}

export const UserDevotesCTX = createContext<ContextValue>({} as ContextValue)

export default function UserDevotesProvider ({children}: {children: React.ReactNode}) {
  const [userDevotes, setUserDevotes] = useState<TDevote[]>()

  return (
    <UserDevotesCTX.Provider value={{userDevotes, setUserDevotes}}>
      {children}
    </UserDevotesCTX.Provider>
  )
}