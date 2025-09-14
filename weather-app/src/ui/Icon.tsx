const Icon = ({ image, className }: { image: string; className?: string }) => {
  return <img src={image} alt='logo' className={`h-full ${className}`} />
}

export default Icon
