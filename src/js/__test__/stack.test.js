import Stack from '../stack.js';

describe('Stack tests', () => {
  test('should create an empty Stack', () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBeTruthy();
  });

  test('should return element at the top of Stack (without modifying it)', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    expect(stack.peak()).toBe(2);
    expect(stack.length()).toBe(2);
  });

  test('should return element at the top of Stack', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.length()).toBe(1);
  });

  test('should throw an Error if trying to peak and empty stack', () => {
    const stack = new Stack();

    expect(() => stack.peak()).toThrowErrorMatchingInlineSnapshot(
      `"Stack is empty"`
    );
  });
});
