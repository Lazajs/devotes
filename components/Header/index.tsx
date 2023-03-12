import { Icons } from "../Icons"
import { Ubuntu } from 'next/font/google'
// import { AuthState } from 'types'
import LoginButton from './LoginButton'
import AuthenticatedDisplay from './AuthenticatedDisplay'

const { Logo } = Icons
const ubuntu = Ubuntu({weight: ['700'], subsets: ['latin']})

export default function Header() {
 return (
    <header>
      <h1 className={`${ubuntu.className} text-title whitespace-nowrap relative z-10 text-center text-textBlack`}>Dev<Logo className="z-10 inline"/>te</h1>
      
      {/* {name ? <small className='text-text block text-center mb-small font-heavy'>{name}</small> : ''}
      <span>
        {
          status === 'authenticated' ?  <AuthenticatedDisplay image={image} /> : <LoginButton />
        } */}
      {/* </span> */}
    </header>
  )
}