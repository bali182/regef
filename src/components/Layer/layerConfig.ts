export interface ZoomEvent {
  level: number
  delta: number
}

export interface LayerConfig {
  setZoomLevel(component: React.Component, event: ZoomEvent): void
  getZoomLevel(component: React.Component): number
}