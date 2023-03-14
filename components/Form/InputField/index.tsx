import { useState } from "react"
import { Icons } from "@/components/Icons"

interface Props {
  reference: React.Ref<HTMLInputElement>
  type: 'password' | 'text'
  holder: string,
  error: boolean
}

const {EyeOpen, EyeClosed} = Icons

export default function InputField ({reference, type, holder, error}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  if (type === 'password') {
    const handleClick = ()=> type === 'password' ? setIsVisible(!isVisible) : ''

    return (
      <span className="relative">
        <input className={`w-full pr-[6rem] bg-primary outline-none ${error ? 'border-negativae border-solid border-[1px]' : 'border-none'} h-[6rem] text-text p-medium font-normal text-textWhite`} placeholder={holder} type={isVisible ? 'text' : 'password'} ref={reference} />
        {isVisible ? <EyeOpen className='w-[5rem] absolute right-0 top-2 h-[5rem] z-2 invert-1'onClick={handleClick} /> : <EyeClosed className='w-[5rem] h-[5rem] z-2 absolute right-0 top-2 invert-1' onClick={handleClick} />}
      </span>
    ) 
  }

  return (
    <input className='w-full bg-primary outline-none border-none h-[6rem] text-text p-medium font-normal text-textWhite' placeholder={holder} type={type} ref={reference} />
  )
}