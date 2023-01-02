const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://twitter.com',
    waitForAnimations: true,
    watchForFileChanges: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    pageLoadTimeout: 20000,
    setupNodeEvents(on, config) {},
  },
})

