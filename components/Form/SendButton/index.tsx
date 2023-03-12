type Prop = 'Sign In' | 'Sign Up'

export default function SendButton ({text}: {text :Prop}) {
  return (
    <span className="block m-auto w-[50%] ">
      <button className="bg-primary text-text  text-textWhite p-medium h-[6rem] w-full">{text}</button>
      <p className="text-small mt-small text-center">Or {text === 'Sign In' ? 'Sign Up' : 'Sign In'}</p>
    </span>
  )
}