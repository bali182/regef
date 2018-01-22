import BaseKeyHandler from './BaseKeyHandler'

export default class CancelMouseHandlersKeyHandler extends BaseKeyHandler {
  onKeyDown({ key }) {
    if (key === 'Escape') {
      this.engine.mouseHandlers.forEach((tracker) => tracker.cancel())
    }
  }
}
