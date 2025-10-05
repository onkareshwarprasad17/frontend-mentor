type TextProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  className?: string
}

const Text = ({ children }: TextProps) => {
  return <p className='font-bold font-bricolage-grotesque text-neutral-0 text-left'>{children}</p>
}

export default Text
