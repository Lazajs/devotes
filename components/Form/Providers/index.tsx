import { Icons } from "@/components/Icons"

const {Github, Linkedin} = Icons

export default function Providers () {
  return (
    <span>
      <a href="/api/auth/provider/linkedin">
        <Linkedin className="w-[50px] cursor-pointer h-[50px] absolute right-[12rem] lg:right-[15rem] top-0" />
      </a>
      <a href="/api/auth/provider/github">
        <Github className="w-[50px] cursor-pointer h-[50px] absolute left-[12rem] lg:left-[15rem] top-3" />
      </a>
    </span>
  )
}
