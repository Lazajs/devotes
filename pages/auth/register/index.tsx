import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import Form from "@/components/Form";
import InputField from "@/components/Form/InputField";
import SendButton from "@/components/Form/SendButton";
import type { InputFieldError } from "@/types";
import Providers from "@/components/Form/Providers"

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
        //Shouldn't be 'null', regex tested before
        body: JSON.stringify({
          name: name.current.value,
          email: email.current!.value,
          password: password.current!.value
        })
      })

      if (request.ok) router.push('/')
      else {
        const {status} = request
        let msg = 'Some credential is missing or not valid' //status code 400
        if (status === 409) msg = 'User already exists, please log in or try another information'
        setInputError({from: 'form', msg})
      }
    }

  }

  return (
    <MainLayout>
      <Form handleAction={handleSubmit}>
        <Providers />
        <InputField type="text" error={inputError?.from === 'name'} reference={name} holder='Name'/>
        {inputError?.from === 'name' ? <p className="text-negativae text-center text-text" >{inputError.msg}</p> : ''}
        <InputField type="text" error={inputError?.from === 'email'} reference={email} holder='Email'/>
        {inputError?.from === 'email' ? <p className="text-negativae text-center text-text">{inputError.msg}</p> : ''}
        <InputField type="password" error={inputError?.from === 'password'} reference={password} holder='Password'/>
        {inputError?.from === 'password' ? <p className="text-negativae text-center text-text">{inputError.msg}</p> : ''}
        <SendButton text={'Sign Up'} />
        {inputError?.from === 'form' ? <p className="text-negativae z-30 text-center text-text">{inputError.msg}</p> : ''}
    </Form>
    </MainLayout>
  )
}