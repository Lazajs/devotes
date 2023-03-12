import Image from "next/image"
import topBg from 'public/images/top-bg.svg'
import bottomBg from 'public/images/bottom-bg.svg'

export default function Decoration ({children}: {children: React.ReactNode}) {
  return (
    <>
      <Image src={topBg} priority alt='decoration' className="w-full absolute top-0 right-0 rotate-180 h-[15%] sm:h-[20%] z-0 select-none "/>
        {children}
      <Image src={bottomBg} priority alt='decoration' className="w-full absolute bottom-0 left-0 h-[15%] sm:h-[20%] z-0 select-none "/>
    </>
  )
}