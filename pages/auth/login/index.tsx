import { useRouter } from "next/navigation"
import MainLayout from "@/components/MainLayout"
import Form from "@/components/Form"
import InputField from "@/components/Form/InputField"
import SendButton from "@/components/Form/SendButton"
import { useRef, useState } from "react"
import type { InputFieldError } from "@/types"

export default function Login () {
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [inputError, setInputError] = useState<InputFieldError | null>()
  const router = useRouter() 

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const emailMatch = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email.current?.value || '')
    const passwordMatch = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})").test(password.current?.value || '')

    if (!emailMatch) setInputError({from: 'email', msg: 'Invalid email'})
    if (!passwordMatch) setInputError({from: 'password', msg: 'Invalid password'})

    if (emailMatch && passwordMatch) {
      setInputError(null)

      const request = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        //Shouldn't be 'null', regex tested before
        body: JSON.stringify({
          email: email.current!.value,
          password: password.current!.value
        })
      })

      if (request.ok) router.push('/')
      else {
        const {status} = request
        let customError: InputFieldError = {from: 'form', msg: 'Some credential is missing or not valid'} //status code 400
        if (status === 404) customError.msg = 'This user does not exist, re-check your information'
        else if (status === 401) customError = { from: 'password', msg: 'Invalid password' }
        setInputError(customError)
      }
    }

  }

  return (
    <MainLayout>
      <Form handleAction={handleSubmit}>
        <InputField type="text" reference={email} holder="Email" error={inputError?.from === 'email'}/>
        {inputError?.from === 'email' ? <p className="text-negativae text-center text-text">{inputError.msg}</p> : ''}
        <InputField type='password' reference={password} holder="Password" error={inputError?.from === 'password'}/>
        {inputError?.from === 'password' ? <p className="text-negativae text-center text-text">{inputError.msg}</p> : ''}
        <SendButton text="Sign In" />
        {inputError?.from === 'form' ? <p className="text-negativae text-center text-text">{inputError.msg}</p> : ''}
      </Form>
    </MainLayout>
  ) 
}