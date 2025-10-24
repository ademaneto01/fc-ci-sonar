// tests/math.test.js
import test from "node:test";
import assert from "node:assert/strict";
import {
  add, subtract, multiply, divide,
  square, cube, sumArray, fibonacci,
  factorial, isPrime, average
} from "../src/utils/math.js";

// add
test("add soma números", () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
  assert.equal(add(0.1, 0.2), 0.30000000000000004);
});
test("add valida tipos", () => {
  assert.throws(() => add("2", 3), { name: "TypeError" });
  assert.throws(() => add(2, null), { name: "TypeError" });
});

// subtract
test("subtract funciona com inteiros e negativos", () => {
  assert.equal(subtract(5, 3), 2);
  assert.equal(subtract(-1, -4), 3);
  assert.equal(subtract(0, 2), -2);
});
test("subtract valida tipos", () => {
  assert.throws(() => subtract("2", 3), { name: "TypeError" });
  assert.throws(() => subtract(2, undefined), { name: "TypeError" });
});

// multiply
test("multiply funciona com inteiros e zero", () => {
  assert.equal(multiply(4, 3), 12);
  assert.equal(multiply(-2, 5), -10);
  assert.equal(multiply(0, 99), 0);
});
test("multiply valida tipos", () => {
  assert.throws(() => multiply("2", 3), { name: "TypeError" });
  assert.throws(() => multiply({}, 1), { name: "TypeError" });
});

// divide
test("divide funciona com inteiros e floats", () => {
  assert.equal(divide(10, 2), 5);
  assert.equal(divide(-9, 3), -3);
  assert.equal(divide(1, 4), 0.25);
});
test("divide valida tipos e divisão por zero", () => {
  assert.throws(() => divide("10", 2), { name: "TypeError" });
  assert.throws(() => divide(10, "2"), { name: "TypeError" });
  assert.throws(() => divide(1, 0), { name: "RangeError" });
});

// square
test("square funciona", () => {
  assert.equal(square(5), 25);
  assert.equal(square(-3), 9);
  assert.equal(square(0), 0);
});
test("square valida tipo", () => {
  assert.throws(() => square("5"), { name: "TypeError" });
});

// cube
test("cube funciona", () => {
  assert.equal(cube(3), 27);
  assert.equal(cube(-2), -8);
  assert.equal(cube(0), 0);
});
test("cube valida tipo", () => {
  assert.throws(() => cube(null), { name: "TypeError" });
});

// sumArray
test("sumArray soma itens numéricos", () => {
  assert.equal(sumArray([1, 2, 3]), 6);
  assert.equal(sumArray([]), 0);
  assert.equal(sumArray([0.1, 0.2]), 0.30000000000000004);
});
test("sumArray valida tipos", () => {
  assert.throws(() => sumArray("not array"), { name: "TypeError" });
  assert.throws(() => sumArray([1, "2", 3]), { name: "TypeError" });
});

// fibonacci
test("fibonacci retorna sequência até n", () => {
  assert.deepEqual(fibonacci(0), [0]);
  assert.deepEqual(fibonacci(1), [0, 1]);
  assert.deepEqual(fibonacci(5), [0, 1, 1, 2, 3, 5]);
  assert.deepEqual(fibonacci(10), [0,1,1,2,3,5,8,13,21,34,55]);
});
test("fibonacci valida n", () => {
  assert.throws(() => fibonacci(-1), { name: "RangeError" });
  assert.throws(() => fibonacci("5"), { name: "RangeError" });
});

// factorial
test("factorial calcula corretamente", () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
  assert.equal(factorial(10), 3628800);
});
test("factorial valida n", () => {
  assert.throws(() => factorial(-3), { name: "RangeError" });
  assert.throws(() => factorial("3"), { name: "RangeError" });
});

// isPrime
test("isPrime identifica primos e compostos", () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(3), true);
  assert.equal(isPrime(4), false);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(18), false);
  assert.equal(isPrime(97), true);
});
test("isPrime valida n", () => {
  assert.throws(() => isPrime(0), { name: "RangeError" });
  assert.throws(() => isPrime(1), { name: "RangeError" });
  assert.throws(() => isPrime("7"), { name: "RangeError" });
});

// average
test("average calcula média", () => {
  assert.equal(average([2, 4, 6]), 4);
  assert.equal(average([5]), 5);
});
test("average valida array", () => {
  assert.throws(() => average([]), { name: "TypeError" });
  assert.throws(() => average("x"), { name: "TypeError" });
  assert.throws(() => average([1, "2"]), { name: "TypeError" });
});
