export function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Parâmetros devem ser números.");
  }
  return a + b;
}


