

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
        value: generateNumber(-100, 100),
        label: 'Aralık'
      },
      {
        color: generateColor(false),
        value: generateNumber(-100, 100),
        label: 'Ocak'
      },
      {
        color: generateColor(false),
        value: generateNumber(-100, 100),
        label: 'Şubat'
      },
      {
        color: generateColor(false),
        value: generateNumber(-100, 100),
        label: 'Şubat1'
      }
    ],
    width: 400,
    height: 400
  }
}

