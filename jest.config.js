module.exports = {
  verbose: true,
  testEnvironment: "node",
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  projects: [
    {
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      displayName: "sta-node",
      testMatch: ["<rootDir>/**/__tests__/*.js"],
      moduleDirectories: [".", "./src", "./src/utils", "node_modules"],
      moduleNameMapper: {
        "^@root(.*)$": "<rootDir>/src/$1",
        "^@utils(.*)$": "<rootDir>/src/utils/$1",
        "^@errors(.*)$": "<rootDir>/src/utils/errors/$1",
        "^@services(.*)$": "<rootDir>/src/services/$1",
        "^@models(.*)$": "<rootDir>/src/models/$1",
        "^@env(.*)$": "<rootDir>/src/env/$1",
        "^@resolvers(.*)$": "<rootDir>/src/graphql/resolvers/$1",
        "^@dataSources(.*)$": "<rootDir>/src/dataSources/$1",
      },
    },
  ],
};
