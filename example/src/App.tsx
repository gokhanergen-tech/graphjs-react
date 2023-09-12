import React from 'react'
import BarChart from './components/BarChart'
import { generateColor } from './utils'

const App = () => {
  return <BarChart values={[
    {
      label: 'engin',
      value: -50,
      color: generateColor()
    },
    {
      label: 'engin',
      value: 30,
      color: generateColor()
    },
  ]} />
}

export default App
