export const isRoot = (component) => Boolean(component) && Boolean(component.props.root)
export const isNode = (component) => Boolean(component) && Boolean(component.props.node)
export const isStep = (component) => Boolean(component) && Boolean(component.props.step)
export const isPort = (component) => Boolean(component) && component.props.visible !== undefined
export const isContainer = (component) => Boolean(component) && Boolean(component.props.container)
