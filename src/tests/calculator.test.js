const { add, sub, mul, div } = require('../calculator');

describe('Calculator functions', () => {
  describe('addition', () => {
    test('2 + 3 = 5 (example from image)', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('handles negative and decimal numbers', () => {
      expect(add(-1, 1.5)).toBeCloseTo(0.5);
    });
  });

  describe('subtraction', () => {
    test('10 - 4 = 6 (example from image)', () => {
      expect(sub(10, 4)).toBe(6);
    });

    test('result can be negative', () => {
      expect(sub(2, 5)).toBe(-3);
    });
  });

  describe('multiplication', () => {
    test('45 * 2 = 90 (example from image)', () => {
      expect(mul(45, 2)).toBe(90);
    });

    test('handles decimals', () => {
      expect(mul(2.5, 4)).toBeCloseTo(10);
    });
  });

  describe('division', () => {
    test('20 / 5 = 4 (example from image)', () => {
      expect(div(20, 5)).toBe(4);
    });

    test('division produces floating results', () => {
      expect(div(7, 2)).toBeCloseTo(3.5);
    });

    test('division by zero throws an error', () => {
      expect(() => div(1, 0)).toThrow('Division by zero');
    });
  });
});
