import test from "node:test";
import assert from "node:assert/strict";
import { add } from "../src/utils/math.js";

test("add soma dois números", () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
});

test("add lança erro para entradas não numéricas", () => {
  assert.throws(() => add("2", 3), { name: "TypeError" });
  assert.throws(() => add(2, null), { name: "TypeError" });
});
