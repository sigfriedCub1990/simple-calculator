import { tokenize } from "../parser";

describe("Parser tests", () => {
  describe("Simple expressions", () => {
    test("should tokenize a simple expression", () => {
      const output = tokenize("4+5");
      const expected = [
        { value: "4", type: "operand" },
        { value: "+", type: "operator" },
        { value: "5", type: "operand" },
      ];
      expect(output).toEqual(expected);
    });

    test("should tokenize a simple expression with 2 digit numbers", () => {
      const output = tokenize("44+55");
      const expected = [
        { value: "44", type: "operand" },
        { value: "+", type: "operator" },
        { value: "55", type: "operand" },
      ];
      expect(output).toEqual(expected);
    });

    test("should tokenize a simple expression with 3 digit numbers", () => {
      const output = tokenize("666+55");
      const expected = [
        { value: "666", type: "operand" },
        { value: "+", type: "operator" },
        { value: "55", type: "operand" },
      ];
      expect(output).toEqual(expected);
    });
  });

  describe("More complex expressions", () => {
    test("should tokenize an expression with 2 operators", () => {
      const output = tokenize("666+55*4");
      const expected = [
        { value: "666", type: "operand" },
        { value: "+", type: "operator" },
        { value: "55", type: "operand" },
        { value: "*", type: "operator" },
        { value: "4", type: "operand" },
      ];
      expect(output).toEqual(expected);
    });

    test("should tokenize an expression with floating numbers", () => {
      const output = tokenize("6,66+55*4");
      const expected = [
        { value: "6,66", type: "operand" },
        { value: "+", type: "operator" },
        { value: "55", type: "operand" },
        { value: "*", type: "operator" },
        { value: "4", type: "operand" },
      ];
      expect(output).toEqual(expected);
      console.log(output.reverse());
    });
  });
});
