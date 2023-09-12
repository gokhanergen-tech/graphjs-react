import React from 'react'
import Pie from './components/pie/Pie'

const App = () => {
  return <Pie data={[
    {
      value:Math.round(Math.random()*180),
      name:"Agdfgggggggggggggggggggggggg",
      backgroundColor:"lightgreen"
    },
    {
      value:Math.round(Math.random()*180),
      name:"B",
      backgroundColor:"green"
    }
  ]}></Pie>
}

export default App
