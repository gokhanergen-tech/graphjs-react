import React from 'react'
import { generateColor, generateNumber } from './utils'
import BarChart from './components/BarChart'

const App = () => {
  return <>
    <BarChart
      title={{ label: 'engin' }}
      titles={{ x: 'engin', y: 'engin' }}
      values={[
        {
          color: generateColor(false),
          y: generateNumber(1033420302, 200343233202),
          x: 'Ocak'
        },
        {
          color: generateColor(false),
          y: generateNumber(1033420302, 200343233202),
          x: 'Ocak2'
        },
        {
          color: generateColor(false),
          y: generateNumber(1033420302, 200343233202),
          x: 'Ocak3'
        }
      ]}
      width={400}
      height={400}
      onBarClick={(item) => {
        alert(item.x + " " + item.y)
      }}
    />
  </>
}

export default App
