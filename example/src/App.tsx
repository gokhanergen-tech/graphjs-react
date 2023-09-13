import React from 'react'
import Pie from './components/pie/Pie'
import Base from './components/base/Base'

const App = () => {
  return <>
  <Pie data={[
    {
      value:Math.round(Math.random()*180),
      name:"Agdfgggggggggggggggggggggggg",
      backgroundColor:"lightgreen",
      textColor:"white"
    },
    {
      value:Math.round(Math.random()*180),
      name:"B",
      backgroundColor:"green",
      textColor:"red"
    },
    {
      value:Math.round(Math.random()*180),
      name:"C",
      backgroundColor:"red",
      textColor:"white"
    },
    {
      value:Math.round(Math.random()*180),
      name:"D",
      backgroundColor:"black",
      textColor:"white"
    },{
      value:Math.round(Math.random()*180),
      name:"E",
      backgroundColor:"yellow",
      textColor:"black"
    }
  ]}></Pie>
  <Base data={{
    x:[1,10,7],
    y:[2,3,9]
  }}></Base>
  </>
}

export default App
