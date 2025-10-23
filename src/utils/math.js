export function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Parâmetros devem ser números.");
  }
  return a + b;
}

export function subtract(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Parâmetros devem ser números.");
  }
  return a - b;
}

export function multiply(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Parâmetros devem ser números.");
  }
  return a * b;
}

export function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Parâmetros devem ser números.");
  }
  if (b === 0) {
    throw new Error("Divisão por zero não é permitida.");
  }
  return a / b;
}

export function isEven(n) {
  if (typeof n !== "number") {
    throw new TypeError("Parâmetro deve ser um número.");
  }
  return n % 2 === 0;
}

export function factorial(n) {
  if (typeof n !== "number" || n < 0) {
    throw new TypeError("Parâmetro deve ser um número não negativo.");
  }
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.some(n => typeof n !== "number")) {
    throw new TypeError("Parâmetro deve ser um array de números.");
  }
  return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
}

export function max(numbers) {
  if (!Array.isArray(numbers) || numbers.some(n => typeof n !== "number")) {
    throw new TypeError("Parâmetro deve ser um array de números.");
  }
  return Math.max(...numbers);
}

export function min(numbers) {
  if (!Array.isArray(numbers) || numbers.some(n => typeof n !== "number")) {
    throw new TypeError("Parâmetro deve ser um array de números.");
  }
  return Math.min(...numbers);
}

