import { assets } from '../src';

describe('tsetmc.ir', () => {
  it('assets return a list', async () => {
    const result = await assets();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length > 0).toBeTruthy();
  });
});
