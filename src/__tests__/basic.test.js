import { describe, it, expect } from '@jest/globals';


describe('Basic Test', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });
  
  it('should handle string operations', () => {
    expect('hello' + ' world').toBe('hello world');
  });
});
