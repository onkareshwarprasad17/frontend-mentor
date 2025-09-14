import Header from './components/header/Header'

function App() {
  return (
    <div className='max-w-7xl h-dvh mx-auto min-w-[375px] max-xl:px-6 max-md:px-4'>
      <Header />
      <h1 className='w-full max-w-[343px] md:w-[482px] md:max-w-none lg:w-auto lg:max-w-7xl font-bricolage-grotesque text-[3.5rem] leading-[120%] text-center [7xl]:my-16 my-12 text-neutral-0'>
        How's the sky looking today?
      </h1>
    </div>
  )
}

export default App
