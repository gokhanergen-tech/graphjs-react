

import type { Meta, StoryObj } from '@storybook/react';
import GraphJSInterface from '../../components/GraphJS/GraphJSInterface';
import BarChart from '../../components/BarChart';
import GraphJS from '../../components/GraphJS';
import React from 'react'
import { generateColor, generateNumber } from '../../utils';
import Pie from '../../components/pie/Pie';
import { Color } from '../../classes/Color';
const meta: Meta<typeof BarChart> = {
  component: GraphJS
};

export default meta;
type Story = StoryObj<GraphJSInterface>;


export const Default: Story = {

  args: {
    Chart: <Pie textToCenter={false} data={[
      {
        name: 'Aralık',
        backgroundColor: generateColor(),
        value: generateNumber(10, 200),
      },
      {
        name: 'Ocak',
        backgroundColor: generateColor(),
        value: generateNumber(10, 200),
      }
    ]} />
  }
}

