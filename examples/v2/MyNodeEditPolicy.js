import EditPolicy from '../../src/experiment/editPolicy'

class MyEditPolicy extends EditPolicy {
  getCommand(request) {
    console.log(request, this.getComponent(), this.getDomNode())
    return null
  }
}

export default MyEditPolicy
