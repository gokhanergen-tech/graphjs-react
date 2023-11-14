
import { withConsole } from '@storybook/addon-console';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
      { name: 'blue', value: '#00f' },
      {name:"gray",value:"lightgray"},
      {name:"white",value:"white"}
    ],
    default:"white"
  }
}

// All stories expect a theme arg
//export const argTypes = { theme: { control: 'select', options: ['light', 'dark'] } };

// The default value of the theme arg to all stories
//export const args = { theme: 'light' };

export const decorators = [
  (Story) =>{
    return  (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    );
  },
  (storyFn, context) => withConsole()(storyFn)(context)
]

export const argTypes = {
  backgroundColor: { control: 'color' },
}