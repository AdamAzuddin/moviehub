import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:3000', // or the URL where your Next.js app is running
    specPattern: 'cypress/e2e/**/*.ts', // Adjust if necessary
  },
});
