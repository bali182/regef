import EditPolicy from '../../src/editPolicy'

class MyEditPolicy extends EditPolicy {
  getCommand(request) {
    console.log('host', this.getComponent())
    console.log('receiver', request.receiver)
    console.log('===', this.getComponent() === request.receiver)
    if (request.receiver === this.getComponent()) {
      console.log(request.type)
    }
    return null
  }
}

export default MyEditPolicy
