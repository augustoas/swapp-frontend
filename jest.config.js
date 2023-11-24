const path = require("path");

module.exports = {
  testEnvironment: "jsdom", // browser environment
  moduleFileExtensions: [
    "js",
    "ts",
    "vue",
    // add other file extensions if necessary
  ],
  moduleNameMapper: {
    "^@/(.*)$": path.join(__dirname, "src/$1"),
  },
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.vue",
    "<rootDir>/src/views/**/*.vue",
    // add other directories or file patterns if necessary
  ],
  testMatch: [
    // specify the test files patterns
    "**/__tests__/**/*.(js|jsx|ts|tsx)",
    "**/?(*.)+(spec|test).(js|jsx|ts|tsx)",
  ],
  // add other configurations if necessary
};
