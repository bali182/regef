import BaseKeyHandler from './BaseKeyHandler'

export default class CancelDragTrackersKeyHandler extends BaseKeyHandler {
  onKeyDown({ key }) {
    if (key === 'Escape') {
      this.engine.dragTrackers.forEach((tracker) => tracker.cancel())
    }
  }
}
