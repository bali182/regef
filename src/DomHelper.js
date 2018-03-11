export default class DomHelper {
  constructor(engine) {
    this.engine = engine
  }
  findPartFor(dom) {
    const parts = this.engine.parts
    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i]
      if (part.domHelper.partContains(dom)) {
        return part
      }
    }
    return null
  }
}
