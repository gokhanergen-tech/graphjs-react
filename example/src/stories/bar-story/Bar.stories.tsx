

import type { Meta, StoryObj } from '@storybook/react';
import BarChartInterface from '../../components/BarChart/BarChartInterface';
import { generateColor, generateNumber } from '../../utils';
import BarChart from '../../components/BarChart';



const meta: Meta<typeof BarChart> = {
  component: BarChart
};

export default meta;
type Story = StoryObj<BarChartInterface>;


export const Default: Story = {

  args: {
    values: [
      {
        color: generateColor(false),
        y: generateNumber(-100, 100),
        x: 'Aralık'
      },
      {
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
        x: 'Şubat1'
      }
    ],
    width: 400,
    height: 400
  }
}

