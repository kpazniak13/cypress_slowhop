const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/report',
    overwrite: true,
    html: false,
    json: true,
    embeddedScreenshots: true
  },
  projectId: '61p832',
  env: {
    bearerToken: '5a297804ccbed4506a99e50ee8248862f681173f23951f2e6078dde879f7e539'
  },
  e2e: {
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }

  },
});
