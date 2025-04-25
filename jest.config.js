module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
};