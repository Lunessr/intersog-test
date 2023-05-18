module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.spec.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: './coverage',
    collectCoverageFrom: [
      '**/*.(t|j)s',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/coverage/**',
      '!jest.config.js',
    ],
  };
  