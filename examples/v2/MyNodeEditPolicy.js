import EditPolicy from '../../src/editPolicy'

class MyEditPolicy extends EditPolicy {
  getCommand(request) {
    if (request.receiver === this.getComponent()) {
      console.log(request.type)
    }
    return null
  }
}

export default MyEditPolicy
