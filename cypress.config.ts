import { defineConfig } from "cypress";

export default defineConfig({

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  },

  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,
  viewportWidth: 960,
  viewportHeight: 650,
  // using mochawesome reporter and saving results under cypress/results folder



  e2e: {
    baseUrl: 'https://qa-practical.qa.swimlane.io',
    // Command timeout overridden for E2E tests
    defaultCommandTimeout: 15000,
    watchForFileChanges: false,
  },


});
