import { render } from "@testing-library/react";
import Pie from "../components/pie/Pie";
//import {Pie} from 'graphjs-react';

it("Smoke Test", () => {
  render(
    <Pie data={[ {
      value:Math.round(Math.random()*180),
      name:"K",
      backgroundColor:"lightgreen",
      textColor:"white"
    },
    {
      value:Math.round(Math.random()*180),
      name:"B",
      backgroundColor:"green",
      textColor:"yellow"
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
    }]} ></Pie>
  );
});
