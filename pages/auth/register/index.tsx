import MainLayout from "@/components/MainLayout";
import InputField from "@/components/Form/InputField";
import { useRef } from "react";
import SendButton from "@/components/Form/SendButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

type InputFieldTypes = 'password' | 'email' | 'name' | 'form'
interface InputFieldError {
  from: InputFieldTypes,
  msg: string
}

export default function Register () {
  const [inputError, setInputError] = useState<InputFieldError | null>()
  const name = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const emailMatch = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.current?.value || '')
    const passwordMatch = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})").test(password.current?.value || '')
    const nameMatch = (name.current !== null) && name.current.value.length > 0 && name.current.value.length < 15

    if (!emailMatch) setInputError({from: 'email', msg: 'Email not valid.'})
    if (!nameMatch) setInputError({from:'name', msg: 'Name is not valid. Too short or long.'})
    if (!passwordMatch) setInputError({from: 'password', msg: 'Password is not secure enough'})

    if (emailMatch && passwordMatch && nameMatch) {
      setInputError(null)

      const request = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //Shouldn't be 'null', regexp tested before
        body: JSON.stringify({
          name: name.current.value,
          email: email.current!.value,
          password: password.current!.value
        })
      })

      if (request.ok) router.push('/')
      else setInputError({from: 'form', msg: 'This user is already exists or its credentials are not valid.'})
    }

  }

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="flex flex-col relative pt-big m-auto w-[90%] max-w-[500px] mt-bigger gap-small">
        <InputField type="text" error={inputError?.from === 'name'} reference={name} holder='Name'/>
        {inputError?.from === 'name' ? <p className="text-negativae text-center text-text" >{inputError.msg}</p> : ''}
        <InputField type="text" error={inputError?.from === 'email'} reference={email} holder='Email'/>
        {inputError?.from === 'email' ? <p className="text-negativae text-center text-text">{inputError.msg}</p> : ''}
        <InputField type="password" error={inputError?.from === 'password'} reference={password} holder='Password'/>
        {inputError?.from === 'password' ? <p className="text-negativae text-center text-text">{inputError.msg}</p> : ''}
        <SendButton text={'Sign Up'} />
        {inputError?.from === 'form' ? <p className="text-negativae z-30 text-center text-text">{inputError.msg}</p> : ''}
      </form>
    </MainLayout>
  )
}