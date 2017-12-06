// This might need to be changed to a proper UUID function or the like.
// I don't see any fatal flaws right now since we don't have concurrency.

const MAX = Number.MAX_SAFE_INTEGER || 9007199254740991

class IdGenerator {
  constructor(start = 0) {
    this.current = start
  }

  next() {
    if (this.current === MAX) {
      this.current = 0
    }
    this.current += 1
    return this.current
  }
}

export default IdGenerator
