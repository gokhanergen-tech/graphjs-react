

import type { Meta, StoryObj } from '@storybook/react';
import { generateColor, generateNumber } from '../../utils';
import BarChart from '../../components/BarChart';
import { ChartInterfaceProps } from '../../components/chart-xy/ChartXY';
import LineChart from '../../components/line-chart/LineChart';
import { CommonProps } from '../../interfaces/graph-interface';
import { LineChartProps } from '../../interfaces/line-chart-interfaces';
//import {BarChart} from 'graphjs-react'



const meta: Meta<typeof BarChart> = {
  component: LineChart
};

export default meta;
type Story = StoryObj<ChartInterfaceProps & CommonProps & LineChartProps>;


export const Default: Story = {

  args: {
    data: [
      [{
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Ocak'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Şubat'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Mart'
      },   {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Nisan'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Mayıs'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Haziran'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Temmuz'
      }, {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Ağustos'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Eylül'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Ekim'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Kasım'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Aralık'
      }],
      // Second
      [{
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Ocak'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Şubat'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Mart'
      },   {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Nisan'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Mayıs'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Haziran'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Temmuz'
      }, {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Ağustos'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Eylül'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Ekim'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Kasım'
      },
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Aralık'
      }]
    ],
    width: 400,
    height: 400,
    labels:[{
      name:"2022",
      color: "blue"
    },{
      name:"2023",
      color: "red"
    }],

    title:{
      label:"Turkey Inflation Rate",
    },
    titles: {
      x:"Months",
      y:"Inflation Rate"
    },
    xAxisLabels:["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
    
  }
}

