import { bindActionCreators } from 'redux'
import {
  Engine,
  DragCapability, // ok
  ConnectCapability, // ok
  SingleSelectionCapability, // ok
  MultiSelectionCapability,
  CancelCapability, // ok
  DeleteCapability, // ok
} from '../../src/index'

import { addChildren, addConnection, deleteComponent, setChildren, setPosition, setSelection } from '../state/actions'

import DiagramSelectionProvider from './DiagramSelectionProvider'

import AddContainerChildrenEditPolicy from './AddContainerChildrenEditPolicy'
import MoveContainerChildrenEditPolicy from './MoveContainerChildrenEditPolicy'
import ConnectComponentsEditPolicy from './ConnectComponentsEditPolicy'
import SelectComponentsEditPolicy from './SelectComponentsEditPolicy'
import MoveRootChildrenEditPolicy from './MoveRootChildrenEditPolicy'
import DeleteComponentsEditPolicy from './DeleteComponentsEditPolicy'
import DisabledAddChildrenEditPolicy from './DisabledAddChildrenEditPolicy'
import LoggerEditPolicy from './LoggerEditPolicy'

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
      new DragCapability(engine),
      new ConnectCapability(engine),
      new SingleSelectionCapability(engine),
      new MultiSelectionCapability(engine),
      new CancelCapability(engine),
      new DeleteCapability(engine),
    ],
    editPolicies: [
      new MoveRootChildrenEditPolicy(engine, dependencies),
      new AddContainerChildrenEditPolicy(engine, dependencies),
      new MoveContainerChildrenEditPolicy(engine, dependencies),
      new ConnectComponentsEditPolicy(engine, dependencies),
      new SelectComponentsEditPolicy(engine, dependencies),
      new DeleteComponentsEditPolicy(engine, dependencies),
      new DisabledAddChildrenEditPolicy(engine, dependencies),
      new LoggerEditPolicy(),
    ],
    selectionProvider: new DiagramSelectionProvider(engine, dependencies),
  }))
}

export default createEngine
