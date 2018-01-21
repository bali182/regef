export default class SelectionProvider {
  constructor() {
    this.toolkit = null
  }
  setToolkit(toolkit) {
    this.toolkit = toolkit
  }
  selection() {
    return []
  }
}
