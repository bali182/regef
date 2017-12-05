// This might need to be changed to a proper UUID function or the like.
// I don't see any fatal flaws right now since we don't have concurrency.
// Might need to be scoped for a Diagram just to make it clearer.

let current = 0

const MAX = Number.MAX_SAFE_INTEGER || 9007199254740991

const id = () => {
  if (current === MAX) {
    current = 0
  }
  current += 1
  return current
}

export default id
