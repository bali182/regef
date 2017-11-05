import { noop, constant, mandatory } from '../utils/functions'

const DefaultConfig = {
  setZoomLevel: noop,
  setOffset: noop,
  getId: mandatory('getId'),
  getZoomLevel: constant(100),
  getMinZoomLevel: constant(10),
  getMaxZoomLevel: constant(300),
  getOffsetX: constant(0),
  getOffsetY: constant(0),
}

export default DefaultConfig
