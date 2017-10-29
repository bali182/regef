export interface ZoomEvent {
  level: number
  delta: number
}

export interface OffsetEvent {
  x: number
  y: number
}

export interface DiagramConfig {
  setZoomLevel(component: React.Component, event: ZoomEvent): void
  getZoomLevel(component: React.Component): number

  setOffset(component: React.Component, event: OffsetEvent): void
  getOffsetX(component: React.Component): number
  getOffsetY(component: React.Component): number
}