import { assets, history } from '../src';

describe('tsetmc.ir', () => {
  0 &&
    it('assets return a list', async () => {
      const result = await assets();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length > 0).toBeTruthy();
    });

  it('history returns a list', async () => {
    const result = await history('32338211917133256');
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length > 0).toBeTruthy();
  });
});
