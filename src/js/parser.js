import { compose, curry } from "./fp_utils";
import Stack from "./stack";

const TYPES = {
  operator: "operator",
  operand: "operand",
};

// PEMDAS
const OPERATORS_PRECEDENCE = {
  "*": 4,
  "/": 3,
  "+": 2,
  "-": 1,
};

const OPERATORS = {
  "+": curry((a, b) => a + b),
  "-": curry((a, b) => a - b),
  "*": curry((a, b) => a * b),
  "/": curry((a, b) => a / b),
};

const numberRegex = /\d/;
const floatRegex = /\./;

export const tokenize = (exp) => {
  const tokens = [];
  let current = 0;
  while (current < exp.length) {
    let token = exp[current];
    if (numberRegex.test(token)) {
      let number = `${token}`;
      // There must be a better way of doing this ^:(
      while (numberRegex.test(exp[current + 1]) || exp[current + 1] === ".") {
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
  // Adapted from https://www.atechdaily.com/posts/infix-to-prefix-notation-algorithm-and-flowchart
  const tokensCopy = [...tokens];
  const result = [];
  const operatorsStack = new Stack();
  // 1. Reverse initial expression
  const reversedTokens = tokensCopy.reverse();

  for (const token of reversedTokens) {
    if (token.type === TYPES.operand) {
      result.push(token);
    } else {
      if (operatorsStack.isEmpty()) {
        operatorsStack.push(token);
      } else {
        // If there are operators with greater (or equal) precedence than the one we have
        // we push it out of the stack
        while (
          !operatorsStack.isEmpty() &&
          OPERATORS_PRECEDENCE[operatorsStack.peak().value] >=
            OPERATORS_PRECEDENCE[token.value]
        ) {
          const operator = operatorsStack.pop();
          result.push(operator);
        }
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

const _parseNumber = (num) => {
  if (floatRegex.test(num)) {
    return Number.parseFloat(num);
  }
  return Number.parseInt(num);
};

export const evaluate = (tokens) => {
  const stack = new Stack();
  for (const token of tokens) {
    stack.push(token.value);
  }

  while (stack.length() !== 1) {
    let op1 = _parseNumber(stack.pop());
    let op2 = _parseNumber(stack.pop());
    let operator = stack.pop();
    let result = OPERATORS[operator](op2, op1);
    stack.push(result);
  }

  return stack.pop();
};

export const calculate = (input) => {
  return compose(evaluate, toPrefix, tokenize)(input);
};
