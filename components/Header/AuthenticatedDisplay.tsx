import { signOut } from "next-auth/react"
import { Icons } from "../Icons"
import Image from "next/image"

const {Out} = Icons
export default function AuthenticatedDisplay ({image}: {image?: string}) {
  return (
    <>
      {image ? <Image src={image} width={54} alt='User picture' /> : ''}
      <Out onClick={()=> signOut()} className='block mt-small cursor-pointer m-auto scale-90' />
    </>
  )
}