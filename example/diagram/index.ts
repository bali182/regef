import { bindActionCreators } from 'redux'
import {
  Engine,
  DragCapability,
  ConnectCapability,
  SingleSelectionCapability,
  MultiSelectionCapability,
  CancelCapability,
  DeleteCapability,
} from '../../src/index'

import {
  addChildren,
  addConnection,
  deleteComponent,
  setChildren,
  setPosition,
  setSelection,
} from '../state/actions'

import DiagramSelectionProvider from './DiagramSelectionProvider'

import AddContainerChildrenEditPolicy from './AddContainerChildrenEditPolicy'
import MoveContainerChildrenEditPolicy from './MoveContainerChildrenEditPolicy'
import ConnectComponentsEditPolicy from './ConnectComponentsEditPolicy'
import SelectComponentsEditPolicy from './SelectComponentsEditPolicy'
import MoveRootChildrenEditPolicy from './MoveRootChildrenEditPolicy'
import DeleteComponentsEditPolicy from './DeleteComponentsEditPolicy'
import DisabledAddChildrenEditPolicy from './DisabledAddChildrenEditPolicy'
// import LoggerEditPolicy from './LoggerEditPolicy'
import { NODE, PORT, ROOT } from './constants'

const createEngine = (store) => {
  const dependencies = {
    store,
    ...bindActionCreators(
      { addChildren, addConnection, deleteComponent, setChildren, setPosition, setSelection },
      (action) => store.dispatch(action),
    ),
  }
  return new Engine((engine) => ({
    capabilities: [
      new ConnectCapability(engine, { sourceTypes: [PORT], targetTypes: [NODE, ROOT] }),
      new SingleSelectionCapability(engine, { selectables: [NODE] }),
      new MultiSelectionCapability(engine, { selectables: [NODE] }),
      new CancelCapability(engine),
      new DeleteCapability(engine),
      new DragCapability(engine, { draggables: [NODE], hosts: [ROOT, NODE] }),
    ],
    editPolicies: [
      new MoveRootChildrenEditPolicy(engine, dependencies),
      new AddContainerChildrenEditPolicy(engine, dependencies),
      new MoveContainerChildrenEditPolicy(engine, dependencies),
      new ConnectComponentsEditPolicy(engine, dependencies),
      new SelectComponentsEditPolicy(engine, dependencies),
      new DeleteComponentsEditPolicy(engine, dependencies),
      new DisabledAddChildrenEditPolicy(engine, dependencies),
      // new LoggerEditPolicy(),
    ],
    selectionProvider: new DiagramSelectionProvider(engine, dependencies),
    rootType: ROOT,
    types: [ROOT, NODE, PORT],
  }))
}

export default createEngine
