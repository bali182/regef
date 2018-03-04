import SelectionProvider from './SelectionProvider'
import AttachmentWrapper from './AttachmentWrapper'

const CAPABILITIES = Symbol('CAPABILITIES')
const SELECTION_PROVIDER = Symbol('SELECTION_PROVIDER')
const EDIT_POLICIES = Symbol('EDIT_POLICIES')
const DEPENDENCIES = Symbol('DEPENDENCIES')
const ATTACHMENTS = Symbol('ATTACHMENTS')
const DIAGRAM = Symbol('DIAGRAM')

export default class Engine {
  constructor({
    dependencies = {},
    capabilities = [],
    editPolicies = [],
    selectionProvider = new SelectionProvider(),
  }) {
    this[DIAGRAM] = new AttachmentWrapper(DIAGRAM, this)
    this[CAPABILITIES] = capabilities
    this[SELECTION_PROVIDER] = selectionProvider
    this[EDIT_POLICIES] = editPolicies
    this[DEPENDENCIES] = dependencies
    this[ATTACHMENTS] = new Map()

    /* eslint-disable no-param-reassign */
    this.editPolicies.forEach((policy) => {
      policy.dependencies = dependencies
      policy.toolkit = this.toolkit
    })
    this.capabilities.forEach((capability) => {
      capability.engine = this
    })
    /* eslint-enable no-param-reassign */
    this.selectionProvider.dependencies = dependencies
    this.selectionProvider.toolkit = this.toolkit
  }

  attachment(id) {
    if (id === null || id === undefined) {
      throw new TypeError(`Attachment id cannot be ${id}`)
    }
    const attachmentMap = this[ATTACHMENTS]
    if (!attachmentMap.has(id)) {
      attachmentMap.set(id, new AttachmentWrapper(id, this))
    }
    return attachmentMap.get(id)
  }

  get attachments() { return Array.from(this[ATTACHMENTS].values()) }
  get registry() { return this[DIAGRAM].registry }
  get toolkit() { return this[DIAGRAM].toolkit }
  get domHelper() { return this[DIAGRAM].domHelper }

  get capabilities() { return this[CAPABILITIES] }
  get selectionProvider() { return this[SELECTION_PROVIDER] }
  get editPolicies() { return this[EDIT_POLICIES] }
  get dependencies() { return this[DEPENDENCIES] }

  onKeyUp(e) {
    this.capabilities.forEach((capability) => capability.onKeyUp(e))
  }
  onKeyDown(e) {
    this.capabilities.forEach((capability) => capability.onKeyDown(e))
  }
  onMouseDown(e) {
    this.capabilities.forEach((capability) => capability.onMouseDown(e))
  }
  onMouseMove(e) {
    this.capabilities.forEach((capability) => capability.onMouseMove(e))
  }
  onMouseUp(e) {
    this.capabilities.forEach((capability) => capability.onMouseUp(e))
  }
  selection() {
    return this.selectionProvider.selection()
  }
}
