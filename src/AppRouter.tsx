import { useEffect } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
const Loading = lazy(() => import('./components/loading'))
const App = lazy(() => import('./App'))

import { parseCSVToQuestions } from './utils/convertCsvToJson'

export default function AppRouter() {
  // useEffect(() => {
  //   parseCSVToQuestions().then((res) => console.log(res))
  // }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <App />
      </Router>
    </Suspense>
  )
}
