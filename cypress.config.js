const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    pageLoadTimeout : 20000
  },

  component: {
    testIsolation: true, // Adjust this value based on your needs
    specPattern: 'cypress/component/**/*.cy.js',
  },
});
