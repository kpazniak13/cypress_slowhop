const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  // reporter: 'cypress-mochawesome-reporter', 
  // reporterOptions: {
  //   reportDir: 'cypress/report',
  //   html: false,
  //   json: true
  // },
  projectId: '61p832',
  env: {
    bearerToken: '5a297804ccbed4506a99e50ee8248862f681173f23951f2e6078dde879f7e539'
  },
  e2e: {
    setupNodeEvents(on, config) {      
     // require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);
      return config;
    }

  },
});
