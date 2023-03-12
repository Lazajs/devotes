import MainLayout from "@/components/MainLayout";
import InputField from "@/components/Form/InputField";
import { useRef } from "react";
import SendButton from "@/components/Form/SendButton";

export default function Register () {
  const name = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  //Check errors onsubmit and display errors 

  return (
    <MainLayout>
      <form className="flex flex-col m-auto w-[90%] max-w-[500px] mt-bigger gap-small ">
        <InputField type="text" reference={name} holder='Name'/>
        <InputField type="text" reference={email} holder='Email'/>
        <InputField type="password" reference={password} holder='Password'/>
        <SendButton text={'Sign Up'} />
      </form>
    </MainLayout>
  )
}