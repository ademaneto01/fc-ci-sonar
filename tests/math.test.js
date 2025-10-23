import test from "node:test";
import assert from "node:assert/strict";
import {
  add,
  subtract,
  multiply,
  divide,
  isEven,
  factorial,
  average,
  max,
  min,
} from "../src/utils/math.js";

test("add soma dois números", () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
});

test("add lança erro para entradas não numéricas", () => {
  assert.throws(() => add("2", 3), { name: "TypeError" });
  assert.throws(() => add(2, null), { name: "TypeError" });
});

test("subtract subtrai dois números", () => {
  assert.equal(subtract(5, 3), 2);
  assert.equal(subtract(0, 10), -10);
});

test("subtract lança erro para entradas não numéricas", () => {
  assert.throws(() => subtract("5", 3), { name: "TypeError" });
});

test("multiply multiplica dois números", () => {
  assert.equal(multiply(2, 3), 6);
  assert.equal(multiply(-2, 3), -6);
  assert.equal(multiply(0, 10), 0);
});

test("multiply lança erro para entradas não numéricas", () => {
  assert.throws(() => multiply(2, "x"), { name: "TypeError" });
});

test("divide divide dois números", () => {
  assert.equal(divide(6, 3), 2);
  assert.equal(divide(-9, 3), -3);
});

test("divide lança erro para divisão por zero", () => {
  assert.throws(() => divide(5, 0), { message: "Divisão por zero não é permitida." });
});

test("divide lança erro para entradas não numéricas", () => {
  assert.throws(() => divide("10", 2), { name: "TypeError" });
});

test("isEven retorna verdadeiro para números pares", () => {
  assert.equal(isEven(2), true);
  assert.equal(isEven(0), true);
});

test("isEven retorna falso para números ímpares", () => {
  assert.equal(isEven(3), false);
  assert.equal(isEven(-5), false);
});

test("isEven lança erro para entradas não numéricas", () => {
  assert.throws(() => isEven("2"), { name: "TypeError" });
});

test("factorial calcula corretamente o fatorial", () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
});

test("factorial lança erro para valores inválidos", () => {
  assert.throws(() => factorial(-1), { name: "TypeError" });
  assert.throws(() => factorial("3"), { name: "TypeError" });
});

test("average calcula a média corretamente", () => {
  assert.equal(average([1, 2, 3, 4, 5]), 3);
  assert.equal(average([10, 20]), 15);
});

test("average lança erro para arrays inválidos", () => {
  assert.throws(() => average("123"), { name: "TypeError" });
  assert.throws(() => average([1, "2", 3]), { name: "TypeError" });
});

test("max retorna o maior número do array", () => {
  assert.equal(max([1, 5, 3]), 5);
  assert.equal(max([-10, -5, -20]), -5);
});

test("max lança erro para arrays inválidos", () => {
  assert.throws(() => max([1, "2", 3]), { name: "TypeError" });
  assert.throws(() => max("123"), { name: "TypeError" });
});

test("min retorna o menor número do array", () => {
  assert.equal(min([1, 5, 3]), 1);
  assert.equal(min([-10, -5, -20]), -20);
});

test("min lança erro para arrays inválidos", () => {
  assert.throws(() => min([1, "2", 3]), { name: "TypeError" });
  assert.throws(() => min(null), { name: "TypeError" });
});
