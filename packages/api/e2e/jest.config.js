// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/e2e/**/*.e2e.ts"],
  testTimeout: 30000, // real network calls may take longer than unit tests
  displayName: "API E2E Tests",
};
