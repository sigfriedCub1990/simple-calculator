class Stack {
  constructor() {
    this.stack = [];
  }

  peak() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    } else {
      return this.stack[this.stack.length - 1];
    }
  }

  pop() {
    return this.stack.pop();
  }

  push(element) {
    this.stack.push(element);
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  length() {
    return this.stack.length;
  }
}

export default Stack;
