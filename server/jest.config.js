module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globalSetup: './src/test/globalSetup.ts',
  globalTeardown: './src/test/globalTearDown.ts'
};
