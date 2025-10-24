// tests/math.test.js
import test from "node:test";
import assert from "node:assert/strict";
import {
  add, subtract, multiply, divide,
  square, cube, sumArray, fibonacci,
  factorial, isPrime, average
} from "../src/utils/math.js";

// add
test("add", () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
  assert.throws(() => add("2", 3), { name: "TypeError" });
});

// subtract
test("subtract", () => {
  assert.equal(subtract(5, 3), 2);
  assert.equal(subtract(-1, -4), 3);
  assert.throws(() => subtract(2, undefined), { name: "TypeError" });
});

// multiply
test("multiply", () => {
  assert.equal(multiply(4, 3), 12);
  assert.equal(multiply(-2, 5), -10);
  assert.throws(() => multiply("2", 3), { name: "TypeError" });
});

// divide
test("divide", () => {
  assert.equal(divide(10, 2), 5);
  assert.equal(divide(-9, 3), -3);
  assert.throws(() => divide(1, 0), { name: "RangeError" });
  assert.throws(() => divide("10", 2), { name: "TypeError" });
});

// square
test("square", () => {
  assert.equal(square(5), 25);
  assert.equal(square(-3), 9);
  assert.throws(() => square("5"), { name: "TypeError" });
});

// cube
test("cube", () => {
  assert.equal(cube(3), 27);
  assert.equal(cube(-2), -8);
  assert.throws(() => cube(null), { name: "TypeError" });
});

// sumArray
test("sumArray", () => {
  assert.equal(sumArray([1, 2, 3]), 6);
  assert.equal(sumArray([]), 0);
  assert.throws(() => sumArray("x"), { name: "TypeError" });
  assert.throws(() => sumArray([1, "2"]), { name: "TypeError" });
});

// fibonacci
test("fibonacci", () => {
  assert.deepEqual(fibonacci(0), [0]);
  assert.deepEqual(fibonacci(1), [0, 1]);
  assert.deepEqual(fibonacci(5), [0, 1, 1, 2, 3, 5]);
  assert.throws(() => fibonacci(-1), { name: "RangeError" });
  assert.throws(() => fibonacci("5"), { name: "RangeError" });
});

// factorial
test("factorial", () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(5), 120);
  assert.throws(() => factorial(-3), { name: "RangeError" });
  assert.throws(() => factorial("3"), { name: "RangeError" });
});

// isPrime
test("isPrime", () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(18), false);
  assert.throws(() => isPrime(1), { name: "RangeError" });
  assert.throws(() => isPrime("7"), { name: "RangeError" });
});

// average
test("average", () => {
  assert.equal(average([2, 4, 6]), 4);
  assert.equal(average([5]), 5);
  assert.throws(() => average([]), { name: "TypeError" });
  assert.throws(() => average("x"), { name: "TypeError" });
});
