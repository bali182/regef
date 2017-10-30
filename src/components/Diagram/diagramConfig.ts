export type ZoomEvent = {
  level: number
  delta: number
}

export type OffsetEvent = {
  x: number
  y: number
}

export type DiagramConfig = {
  setZoomLevel?: (component: React.Component, event: ZoomEvent) => void
  getZoomLevel?: (component: React.Component) => number
  getMinZoomLevel?: (component: React.Component) => number
  getMaxZoomLevel?: (component: React.Component) => number
  setOffset?: (component: React.Component, event: OffsetEvent) => void
  getOffsetX?: (component: React.Component) => number
  getOffsetY?: (component: React.Component) => number
}