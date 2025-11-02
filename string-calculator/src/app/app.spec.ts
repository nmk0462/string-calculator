import { App } from './app';

describe('calculate()', () => {
  let calc: App;

  beforeEach(() => {
    calc = new App();
  });

  it('returns 0 when input is empty', () => {
    expect(calc.calculate("")).toBe(0);
  });

  it('returns the number itself when only one number is provided', () => {
    expect(calc.calculate("7")).toBe(7);
  });

  it('adds two numbers separated by a comma', () => {
    expect(calc.calculate("4,5")).toBe(9);
  });

  it('handles multiple comma-separated values', () => {
    expect(calc.calculate("1,2,3,4")).toBe(10);
  });

  it('supports newline characters as delimiters', () => {
    expect(calc.calculate("2\n3,4")).toBe(9);
  });

  it('allows custom delimiter defined at the start', () => {
    expect(calc.calculate("//;\n2;3")).toBe(5);
  });

  it('works with custom delimiter and newline together', () => {
    expect(calc.calculate("//|\n1|2\n3")).toBe(6);
  });

  it('throws error if a negative number is present', () => {
    expect(() => calc.calculate("3,-1")).toThrow("negative numbers not allowed -1");
  });

  it('throws error listing all negative numbers', () => {
    expect(() => calc.calculate("5,-2,-8")).toThrow("negative numbers not allowed -2,-8");
  });

  it('ignores non-numeric values in the input', () => {
    expect(calc.calculate("1,hello,2")).toBe(3);
  });

  it('handles custom delimiter with special characters like dot', () => {
    expect(calc.calculate("//.\n1.2.3")).toBe(6);
  });

  it('handles custom delimiter with plus sign', () => {
    expect(calc.calculate("//+\n2+3+4")).toBe(9);
  });
});
