module.exports = {
  "stories": [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
    
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  docs: {
    autodocs: true
  },
  webpackFinal: config => {
    return {
      ...config,
      plugins: config.plugins.filter(plugin => {
        if (plugin.constructor.name === 'ESLintWebpackPlugin') {
          return false
        }
        return true
      }),
    }
  }
}