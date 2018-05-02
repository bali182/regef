export default class Toolkit {
  constructor(engine) {
    this.engine = engine
  }
  forPart(id) {
    const part = this.engine.part(id)
    if (part === null) {
      throw new Error(`DiagramPart ${id} hasn't been registered.`)
    }
    return part ? part.toolkit : null
  }
  forComponent(component) {
    const parts = this.engine.parts
    for (let i = 0, length = parts.length; i < length; i += 1) {
      const part = parts[i]
      if (part.registry.has(component)) {
        return part
      }
    }
    throw new Error(`Component ${component} is not registered in any DiagramParts.`)
  }
}
