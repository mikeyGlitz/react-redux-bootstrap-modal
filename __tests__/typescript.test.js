import * as tt from 'typescript-definition-tester';

describe('ambient definition test', () => {
  it('should compile against definitions index.d.ts', done =>
    tt.compileDirectory(
      `${__dirname}/typescript`,
      filename => filename.match(/\.tsx?$/),
      {
        jsx: 'react',
      },
      () => done(),
    ));
});
