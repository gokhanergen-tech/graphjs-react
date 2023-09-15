

import type { Meta,StoryObj } from '@storybook/react';
import Pie from '../../components/pie/Pie';
import { PieProps } from '../../interfaces/pie-interfaces';

const meta: Meta<typeof Pie> = {
  component: Pie
};

export default meta;
type Story = StoryObj<PieProps>;


export const Default:Story={

    args:{
      data:[ {
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
      }],
      onMouseClickPiece:()=>{
        alert(5)
      }
    }
}

