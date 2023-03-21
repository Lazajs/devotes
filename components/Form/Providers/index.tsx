import { Icons } from "@/components/Icons"
import { useRouter } from "next/router"

const {Github, Linkedin} = Icons

export default function Providers () {
  const router = useRouter()

  const handleLinkedin = async () => {
    const response = await fetch('/api/auth/provider/linkedin')
    // if (response.ok) router.push('/')
  }

  const handleGithub = () => {
    console.log('github!!')
  }

  return (
    <span>
      <a href="/api/auth/provider/linkedin">
      <Linkedin className="w-[50px] cursor-pointer h-[50px] absolute right-[12rem] lg:right-[15rem] top-0" />
      </a>
      <Github onClick={handleGithub} className="w-[50px] cursor-pointer h-[50px] absolute left-[12rem] lg:left-[15rem] top-3" />
    </span>
  )
}
