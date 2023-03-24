import { TDevote } from "@/types"
import Devote from "../Devote"

export default function Devotes ({devotes}: {devotes: TDevote[] | undefined}) {
  
  if (!devotes || devotes.length <= 0) {
    return (
      <span className="w-fit block m-auto text-medium text-center mt-big">
        <p>
         {'╮(╯ _╰ )╭'} <br /> <p className="m-small mb-0">You have no devotes yet.</p>  <br />{'( •̩̩̩́ _ •̩̩̩̀)'}
        </p>
      </span>
    ) 
  }
  
  return (
    <>
      {devotes.map(devote => <Devote key={devote.id} data={devote} />)}
    </>
  )
}



