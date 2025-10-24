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
    throw new RangeError("Divisão por zero não permitida.");
  }
  return a / b;
}

export function square(n) {
  if (typeof n !== "number") {
    throw new TypeError("Parâmetro deve ser número.");
  }
  return n * n;
}

export function cube(n) {
  if (typeof n !== "number") {
    throw new TypeError("Parâmetro deve ser número.");
  }
  return n * n * n;
}

export function sumArray(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError("Parâmetro deve ser array.");
  }
  return numbers.reduce((acc, n) => {
    if (typeof n !== "number") throw new TypeError("Todos os itens devem ser números.");
    return acc + n;
  }, 0);
}

export function fibonacci(n) {
  if (typeof n !== "number" || n < 0) {
    throw new RangeError("n deve ser >= 0.");
  }
  const seq = [0, 1];
  for (let i = 2; i <= n; i++) seq[i] = seq[i - 1] + seq[i - 2];
  return seq.slice(0, n + 1);
}

export function factorial(n) {
  if (typeof n !== "number" || n < 0) {
    throw new RangeError("n deve ser >= 0.");
  }
  let result = 1;
  for (let i = 1; i <= n; i++) result *= i;
  return result;
}

export function isPrime(n) {
  if (typeof n !== "number" || n < 2) {
    throw new RangeError("n deve ser >= 2.");
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new TypeError("Array inválido.");
  }
  const total = sumArray(numbers);
  return total / numbers.length;
}
