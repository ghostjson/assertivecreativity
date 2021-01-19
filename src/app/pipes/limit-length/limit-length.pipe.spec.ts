import { LimitLengthPipe } from './limit-length.pipe';

describe('LimitLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
