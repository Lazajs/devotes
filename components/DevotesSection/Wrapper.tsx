export default function Wrapper ({children}: {children: React.ReactNode}) {
  return (
    <section className="min-h-full xl:w-1/2 sm:w-3/4 min-w-[370px] block m-auto mt-big p-medium">
      {children}
    </section>
  )
}