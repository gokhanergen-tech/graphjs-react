

import type { Meta,StoryObj } from '@storybook/react';
import { PieProps } from '../../interfaces/pie-interfaces';
import { CommonProps } from '../../interfaces/graph-interface';
import Pie from '../../components/pie/Pie';


const meta: Meta<typeof Pie> = {
  component: Pie
};

export default meta;
type Story = StoryObj<PieProps&CommonProps>;


export const Default:Story={

    args:{
      data:[ {
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
      }],
      onMouseClickPiece:()=>{
        alert(5)
      },
      legend:true
    }
}

