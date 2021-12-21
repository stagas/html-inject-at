module.exports = {
  testEnvironment: 'node', // or 'jsdom'
  rootDir: 'src',
  testMatch: ['**/*.spec.{js,ts}'],
  coverageDirectory: '../coverage',

  // enable this for real typescript builds (slow but accurate)
  // preset: 'ts-jest',

  // enable this for fast, correct sourcemaps but not all features supported
  // transform: {
  //   '\\.(js|ts)$': [
  //     '@stagas/sucrase-jest-plugin',
  //     {
  //       production: true,
  //       disableESTransforms: true,
  //     },
  //   ],
  // },

  // enable this for fast, incorrect sourcemaps but more features supported

  transform: {
    '\\.(js|ts)$': [
      '@swc-node/jest',
      {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
    ],
  },
}
