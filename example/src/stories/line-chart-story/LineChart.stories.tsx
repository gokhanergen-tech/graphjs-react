

import type { Meta, StoryObj } from '@storybook/react';
import { generateColor, generateNumber } from '../../utils';
import BarChart from '../../components/BarChart';
import { ChartInterfaceProps } from '../../components/chart-xy/ChartXY';
import LineChart from '../../components/line-chart/LineChart';
import { CommonProps } from '../../interfaces/graph-interface';
import { LineChartProps } from '../../interfaces/line-chart-interfaces';
//import {BarChart} from 'graphjs-react'


const YEARS = ["2005", "2006", "2007", "2008", "2009", "2010"];
const NUMBERS = [...(new Array(361)).keys()];

const meta: Meta<typeof BarChart> = {
  component: LineChart
};

export default meta;
type Story = StoryObj<ChartInterfaceProps & CommonProps & LineChartProps>;


export const Default: Story = {

  args: {
    data: [
      YEARS.map(year => ({
        color: generateColor(false),
        y: generateNumber(10_000_000, 90_000_000),
        x: year
      })),
      // Second
      YEARS.map(year => ({
        color: generateColor(false),
        y: generateNumber(10_000_000, 90_000_000),
        x: year
      }))
    ],
    width: 400,
    height: 400,
    labels: [{
      name: "A",
      color: "blue"
    }, {
      name: "B",
      color: "red"
    }],

    title: {
      label: "Countries' Populations",
    },
    titles: {
      x: "Year",
      y: "Population"
    },
    xAxisLabels: [
      "2005",
      "2002",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010"],
  }
}

export const NmuberLineChart: Story = {

  args: {
    data: [
      NUMBERS.map(n => ({
        color: generateColor(false),
        y: n**2,
        x: n
      })),
      // Second
      /*NUMBERS.map(n => ({
        color: generateColor(false),
        y: Math.sin(n*Math.PI/180),
        x: n
      }))*/
    ],
    width: 100,
    height: 400,
    labels: [{
      name: "A",
      color: "blue"
    }, {
      name: "B",
      color: "red"
    }],

    title: {
      label: "Countries' Populations",
    },
    titles: {
      x: "Year",
      y: "Population"
    },
    curved: true
  }
}

