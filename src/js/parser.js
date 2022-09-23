import { compose, curry } from './fp_utils.js';
import Stack from './stack.js';

const TYPES = {
  operator: 'operator',
  operand: 'operand',
};

// PEMDAS
const OPERATORS_PRECEDENCE = {
  '*': 4,
  '/': 4,
  '+': 3,
  '-': 3,
};

const OPERATORS = {
  '*': curry((a, b) => a * b),
  '/': curry((a, b) => a / b),
  '+': curry((a, b) => a + b),
  '-': curry((a, b) => a - b),
};

const numberRegex = /\d/;
const floatRegex = /\./;

export const tokenize = (exp) => {
  const tokens = [];
  let current = 0;
  while (current < exp.length) {
    const token = exp[current];
    if (numberRegex.test(token)) {
      let number = `${token}`;
      // There must be a better way of doing this ^:(
      while (numberRegex.test(exp[current + 1]) || exp[current + 1] === '.') {
        number += exp[current + 1];
        current++;
      }

      tokens.push({ value: number, type: TYPES.operand });
    } else {
      tokens.push({ value: token, type: TYPES.operator });
    }

    current++;
  }

  return tokens;
};

export const toPrefix = (tokens) => {
  // https://www.free-online-calculator-use.com/infix-to-prefix-converter.html
  const result = [];
  const operatorsStack = new Stack();
  // 1. Reverse initial expression
  const reversedTokens = [...tokens].reverse();

  for (const token of reversedTokens) {
    if (token.type === TYPES.operand) {
      result.push(token);
    } else if (operatorsStack.isEmpty()) {
      operatorsStack.push(token);
    } else {
      // If current operator has greater precendence than the one at the top of the Stack
      // we push it into the Stack
      if (
        !operatorsStack.isEmpty() &&
        OPERATORS_PRECEDENCE[token.value] >
          OPERATORS_PRECEDENCE[operatorsStack.peak().value]
      ) {
        operatorsStack.push(token);
      } else if (
        OPERATORS_PRECEDENCE[operatorsStack.peak().value] ===
        OPERATORS_PRECEDENCE[token.value]
      ) {
        operatorsStack.push(token);
      } else {
        // If there are operators with greater (or equal) precedence than the one we have
        // we push it out of the stack
        while (
          !operatorsStack.isEmpty() &&
          OPERATORS_PRECEDENCE[operatorsStack.peak().value] >
            OPERATORS_PRECEDENCE[token.value]
        ) {
          const operator = operatorsStack.pop();
          result.push(operator);
        }
        // Push current operator after poping the ones with greater
        // precedence
        operatorsStack.push(token);
      }
    }
  }

  // If there are operators left in the stack just pop them
  while (!operatorsStack.isEmpty()) {
    result.push(operatorsStack.pop());
  }

  // Ath this point we should have a postfix notation,
  // reverse it and we will have a prefix notation
  return result.reverse();
};

const _parseNumber = (number_) => {
  if (floatRegex.test(number_)) {
    return Number.parseFloat(number_);
  }

  return Number.parseInt(number_);
};

export const evaluate = (tokens) => {
  // https://www.free-online-calculator-use.com/prefix-evaluator.html
  const stack = new Stack();
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i].type === TYPES.operand) {
      stack.push(tokens[i]);
    } else {
      const operator = tokens[i].value;
      const rightOperand = _parseNumber(stack.pop().value);
      const leftOperand = _parseNumber(stack.pop().value);

      const result = OPERATORS[operator](rightOperand, leftOperand);

      stack.push({ value: result, type: TYPES.operand });
    }
  }

  return stack.pop().value;
};

export const calculate = (input) => {
  return compose(evaluate, toPrefix, tokenize)(input);
};
