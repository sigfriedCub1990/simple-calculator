import { evaluate, tokenize, toPrefix } from '../parser.js';

describe('Parser tests', () => {
  // TODO: Convert this into test.each
  describe('Simple expressions', () => {
    test('should tokenize a simple expression', () => {
      const output = tokenize('4+5');
      const expected = [
        { value: '4', type: 'operand' },
        { value: '+', type: 'operator' },
        { value: '5', type: 'operand' },
      ];
      expect(output).toEqual(expected);
    });

    test('should tokenize a simple expression with 2 digit numbers', () => {
      const output = tokenize('44+55');
      const expected = [
        { value: '44', type: 'operand' },
        { value: '+', type: 'operator' },
        { value: '55', type: 'operand' },
      ];
      expect(output).toEqual(expected);
    });

    test('should tokenize a simple expression with 3 digit numbers', () => {
      const output = tokenize('666+55');
      const expected = [
        { value: '666', type: 'operand' },
        { value: '+', type: 'operator' },
        { value: '55', type: 'operand' },
      ];
      expect(output).toEqual(expected);
    });
  });

  // TODO: Convert this into test.each
  describe('More complex expressions', () => {
    test('should tokenize an expression with 2 operators', () => {
      const output = tokenize('666+55*4');
      const expected = [
        { value: '666', type: 'operand' },
        { value: '+', type: 'operator' },
        { value: '55', type: 'operand' },
        { value: '*', type: 'operator' },
        { value: '4', type: 'operand' },
      ];
      expect(output).toEqual(expected);
    });

    test('should tokenize an expression with floating numbers', () => {
      const output = tokenize('6.66+55*4');
      const expected = [
        { value: '6.66', type: 'operand' },
        { value: '+', type: 'operator' },
        { value: '55', type: 'operand' },
        { value: '*', type: 'operator' },
        { value: '4', type: 'operand' },
      ];
      expect(output).toEqual(expected);
    });
  });

  describe('Prefix notation test', () => {
    test('should transform to prefix notation', () => {
      const tokens = tokenize('6.66+55*4');
      const output = toPrefix(tokens);
      const expected = [
        { value: '+', type: 'operator' },
        { value: '6.66', type: 'operand' },
        { value: '*', type: 'operator' },
        { value: '55', type: 'operand' },
        { value: '4', type: 'operand' },
      ];

      expect(output).toEqual(expected);
    });

    test('should transform to prefix notation', () => {
      const tokens = tokenize('4*4+4');
      const output = toPrefix(tokens);
      const expected = [
        { value: '+', type: 'operator' },
        { value: '*', type: 'operator' },
        { value: '4', type: 'operand' },
        { value: '4', type: 'operand' },
        { value: '4', type: 'operand' },
      ];

      expect(output).toEqual(expected);
    });

    test('should transform to prefix notation', () => {
      const tokens = tokenize('9/3+2');
      const output = toPrefix(tokens);
      const expected = [
        { value: '+', type: 'operator' },
        { value: '/', type: 'operator' },
        { value: '9', type: 'operand' },
        { value: '3', type: 'operand' },
        { value: '2', type: 'operand' },
      ];

      expect(output).toEqual(expected);
    });

    test('should transform to prefix notation', () => {
      const tokens = tokenize('4-4+6');
      const output = toPrefix(tokens);
      const expected = [
        { value: '+', type: 'operator' },
        { value: '-', type: 'operator' },
        { value: '4', type: 'operand' },
        { value: '4', type: 'operand' },
        { value: '6', type: 'operand' },
      ];

      expect(output).toEqual(expected);
    });
  });

  describe('Evalutate prefix notation', () => {
    test('should output 20.66', () => {
      const input = [
        { value: '+', type: 'operator' },
        { value: '6.66', type: 'operand' },
        { value: '*', type: 'operator' },
        { value: '5', type: 'operand' },
        { value: '4', type: 'operand' },
      ];
      const result = evaluate(input);
      expect(result).toEqual(26.66);
    });

    test('should output 12', () => {
      const input = [
        { value: '+', type: 'operator' },
        { value: '4', type: 'operand' },
        { value: '+', type: 'operator' },
        { value: '4', type: 'operand' },
        { value: '4', type: 'operand' },
      ];
      const result = evaluate(input);
      expect(result).toEqual(12);
    });

    test('should output 20', () => {
      const tokens = tokenize('4*4+4');
      const prefix = toPrefix(tokens);
      const result = evaluate(prefix);
      expect(result).toEqual(20);
    });

    test('should output 20', () => {
      const tokens = tokenize('9/3+2');
      const prefix = toPrefix(tokens);
      const result = evaluate(prefix);
      expect(result).toEqual(5);
    });
  });
});
