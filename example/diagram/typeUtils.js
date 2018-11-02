import { _Root } from '../components/Root/index'
import { _Node } from '../components/Node/index'
import { _Step } from '../components/Step/index'
import { _Port } from '../components/Port/index'
import { _Container } from '../components/Container/index'

export const isRoot = (component) => Boolean(component) && component instanceof _Root
export const isNode = (component) => Boolean(component) && component instanceof _Node
export const isStep = (component) => Boolean(component) && component instanceof _Step
export const isPort = (component) => Boolean(component) && component instanceof _Port
export const isContainer = (component) => Boolean(component) && component instanceof _Container
