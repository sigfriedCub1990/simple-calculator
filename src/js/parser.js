const TYPES = {
  operator: "operator",
  operand: "operand",
};

// PEMDAS
const OPERATORS = {
  "*": 1,
  "/": 2,
  "+": 3,
  "-": 4,
};

const numberRegex = /\d/;

export const tokenize = (exp) => {
  const tokens = [];
  let current = 0;
  while (current < exp.length) {
    let token = exp[current];
    if (numberRegex.test(token)) {
      let number = `${token}`;
      // There must be a better way of doing this ^:(
      while (numberRegex.test(exp[current + 1]) || exp[current + 1] === ",") {
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
