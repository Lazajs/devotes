import Wrapper from "./Wrapper"
import { Icons } from "../Icons"
import { TDevote } from "@/types"

const {Add} = Icons

export default function DevotesSection ({children, setNew}: {children: React.ReactNode, setNew: React.Dispatch<React.SetStateAction<TDevote[] | undefined>>}) {
  return (
    <Wrapper>
      <div className="flex justify-between">
        <h2 className="text-big font-heavy text-textBlack">Dev Notes</h2>
        <Add className="w-[40px] h-[40px] bg-primary cursor-pointer" />
      </div>
      {children}
    </Wrapper>
  )
}