import { Engine } from "./Engine";
import { DiagramPartWrapper } from "./DiagramPartWrapper";

type PartPredicate = (part: DiagramPartWrapper) => boolean

export class DomHelper {
  private engine: Engine
  constructor(engine: Engine) {
    this.engine = engine
  }
  findPart(dom: Element, matcher: PartPredicate = () => true) {
    const parts = this.engine.allParts()
    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i]
      if (part.domHelper.partContains(dom)) {
        return matcher(part) ? part : null
      }
    }
    return null
  }
}
