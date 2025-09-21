function sum_to_n_a(n: number): number {
  if (n <= 1) return n
  let result = 0
  for (let i = 0; i <= n; i++) {
    result += i
  }
  return result
}

function sum_to_n_b(n: number): number {
  if (n <= 1) return n
  return (n * (n + 1)) / 2
}

function sum_to_n_c(n: number): number {
  if (n <= 1) return n
  const result = Array.from({ length: n + 1 }, (_, i) => i).reduce((a, b) => a + b, 0)
  return result
}

console.time("Sum sum_to_n_a time")
console.log("Sum sum_to_n_a:", sum_to_n_a(5))
console.timeEnd("Sum sum_to_n_a time")

console.time("Sum sum_to_n_b time")
console.log("Sum sum_to_n_b:", sum_to_n_b(5))
console.timeEnd("Sum sum_to_n_b time")

console.time("Sum sum_to_n_c time")
console.log("Sum sum_to_n_c:", sum_to_n_c(5))
console.timeEnd("Sum sum_to_n_c time")
