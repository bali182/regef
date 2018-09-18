import { Engine } from "./Engine";
import { PartToolkit } from "./PartToolkit";

export class Toolkit {
  private engine: Engine
  constructor(engine: Engine) {
    this.engine = engine
  }
  forPart(id: string | Symbol): PartToolkit {
    const part = this.engine.part(id)
    if (part === null) {
      throw new Error(`DiagramPart ${id} hasn't been registered.`)
    }
    return part ? part.toolkit : null
  }
  forComponent(component: React.Component): PartToolkit {
    const parts = this.engine.allParts()
    for (let i = 0, length = parts.length; i < length; i += 1) {
      const part = parts[i]
      if (part && part.registry.has(component)) {
        return part.toolkit
      }
    }
    throw new Error(`Component ${component} is not registered in any DiagramParts.`)
  }
}
