interface Props {
  children: React.ReactNode
  handleAction: (e: React.SyntheticEvent)=> Promise<void>
}

export default function Form ({children, handleAction}: Props) {
  return (
    <form onSubmit={handleAction} className="flex flex-col relative pt-big m-auto w-[90%] max-w-[500px] mt-bigger gap-small">
      {children}
    </form>
  )
}