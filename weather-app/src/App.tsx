import { Suspense } from 'react'
import ContentContainer from './components/content-container/ContentContainer'
import Header from './components/header/Header'
import SearchContainer from './components/search-container/SearchContainer'
import { WeatherContextProvider } from './context/WeatherContext'

function App() {
  return (
    <WeatherContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='max-w-7xl mx-auto min-w-[375px] max-xl:px-6 max-md:px-4 md:pb-20 pb-12'>
          <Header />
          <h1 className='max-sm:w-full min-[580px]:w-[482px] md:max-w-none mx-auto lg:w-auto lg:max-w-7xl font-bricolage-grotesque text-[3.5rem] leading-[120%] text-center [7xl]:my-16 my-12 font-bold'>
            How's the sky looking today?
          </h1>

          <main className='flex flex-col lg:gap-12 gap-8 items-center'>
            <SearchContainer />
            <ContentContainer />
          </main>
        </div>
      </Suspense>
    </WeatherContextProvider>
  )
}

export default App
