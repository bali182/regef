import Capability from './Capability'

export default class CancelCapability extends Capability {
  onKeyDown({ key }) {
    if (key === 'Escape') {
      this.engine.capabilities.forEach((tracker) => tracker.cancel())
    }
  }
}
