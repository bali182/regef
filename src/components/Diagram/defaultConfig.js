import { noop, constant } from '../../utils/functions'

const DefaultConfig = {
  // setters
  setZoomLevel: noop,
  setOffset: noop,

  // getters
  getZoomLevel: constant(100),
  getMinZoomLevel: constant(10),
  getMaxZoomLevel: constant(300),
  getOffsetX: constant(0),
  getOffsetY: constant(0),
}

export default DefaultConfig
