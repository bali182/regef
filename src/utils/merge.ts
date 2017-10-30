export function merge<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...(a as any), ...(b as any) }
}