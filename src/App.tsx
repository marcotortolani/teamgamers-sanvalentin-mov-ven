import { useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import { lazy } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { useConfigStore } from './lib/config-store'
import { useGameStore } from './lib/game-store'

import { ENDPOINT_CONFIG } from './data/constants'

const Loading = lazy(() => import('./components/loading'))
const ValidPeriod = lazy(() => import('./components/game-valid-period'))

const Home = lazy(() => import('./screens/home'))
const Questions = lazy(() => import('./screens/questions'))
const Ranking = lazy(() => import('./screens/ranking'))
const Profile = lazy(() => import('./screens/profile'))
const HowToPlay = lazy(() => import('./screens/how-to-play'))
const FAQ = lazy(() => import('./screens/faq'))
const Rewards = lazy(() => import('./screens/rewards'))
//const Terms = lazy(() => import('./screens/terms/terms'))

export default function App() {
  const [searchParams] = useSearchParams()
  const gameHash: string | null = searchParams.get('gameHash') || null
  const userHash: string | null = searchParams.get('userHash') || null
  console.log({ gameHash, userHash })
  //
  // const apiURL =
  //   gameHash && userHash
  //     ? `${ENDPOINT_CONFIG}/?gameHash=${gameHash}&userHash=${userHash}`
  //     : null
  const apiURL = `${ENDPOINT_CONFIG}`

  const { data: configData, loading, error } = useFetch(apiURL)
  const {
    validPeriod,
    lastUpdated,
    updateConfigData,
    categories,
    updateDataEndpoint,
  } = useConfigStore()
  const { syncCategoriesState } = useGameStore()

  const actualDate = new Date().getTime()
  const startDate = new Date(validPeriod.startDate).getTime()
  const endDate = new Date(validPeriod.endDate).getTime()

  useEffect(() => {
    if (!configData) return
    if (configData?.lastUpdated === lastUpdated) return
    updateConfigData(configData)
    updateDataEndpoint({
      gameHash: gameHash,
      userHash: userHash,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configData])

  useEffect(() => {
    if (!categories) return
    syncCategoriesState(categories)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

  if (loading) return <Loading />
  if (error && lastUpdated === '')
    return (
      <div className=" w-full h-[100dvh] px-8 flex items-center justify-center text-center font-medium bg-black text-white">
        Error al cargar los datos: {error.message}
      </div>
    )
  if (actualDate < startDate) {
    return <ValidPeriod type="upcoming" />
  }
  if (actualDate > endDate) {
    return <ValidPeriod type="ended" />
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions/" element={<Questions />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/how-to-play" element={<HowToPlay />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/rewards" element={<Rewards />} />

      {/* <Route path="/terms" element={<Terms />} /> */}
    </Routes>
  )
}
