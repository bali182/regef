import { _Root } from '../components/Root/index'
import { _Node } from '../components/Node/index'
import { _Step } from '../components/Step/index'
import { _Port } from '../components/Port/index'
import { _Container } from '../components/Container/index'

export function isRoot(component: any): component is _Root {
  return Boolean(component) && component instanceof _Root
}
export function isNode(component: any): component is _Node {
  return Boolean(component) && component instanceof _Node
}
export function isStep(component: any): component is _Step {
  return Boolean(component) && component instanceof _Step
}
export function isPort(component: any): component is _Port {
  return Boolean(component) && component instanceof _Port
}
export function isContainer(component: any): component is _Container {
  return Boolean(component) && component instanceof _Container
}
