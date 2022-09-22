// Unregretably stolen from https://mostly-adequate.gitbook.io/mostly-adequate-guide/appendix_a

// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
export const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
export function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}
