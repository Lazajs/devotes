import Decoration from "./Decoration"
import { Poppins } from 'next/font/google'
import Header from "../Header"

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export default function MainLayout ({children}: {children: React.ReactNode}) {
  return (
    <main className={`${poppins.className} main w-full min-h-[100vh] h-full bg-background relative`}>
      <Decoration>
        <Header />
        {children}
      </Decoration>
    </main>
  )
}