import Point from './Point'
import Dimension from './Dimension'

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  contains({ x, y }) {
    return y >= this.y && y < this.y + this.height && x >= this.x && x < this.x + this.width
  }
  intersects({ x, y, width, height }) {
    const x1 = Math.max(this.x, x)
    const x2 = Math.min(this.x + this.width, x + width)
    const y1 = Math.max(this.y, y)
    const y2 = Math.min(this.y + this.height, y + height)
    if (((x2 - x1) < 0) || ((y2 - y1) < 0)) {
      return false
    }
    return true
  }
  translate({ x, y }) {
    return new Rectangle(this.x + x, this.y + y, this.width, this.height)
  }
  size() {
    return new Dimension(this.width, this.height)
  }
  location() {
    return new Point(this.x, this.y)
  }
  scale(scaleX, scaleY) {
    const x = this.x * scaleX
    const y = this.y * scaleY
    const width = ((this.x + this.width) * scaleX) - x
    const height = ((this.x + this.height) * scaleY) - y
    return new Rectangle(x, y, width, height)
  }
  top() {
    return new Point(this.x + (this.width / 2), this.y)
  }
  left() {
    return new Point(this.x, this.y + (this.height / 2))
  }
  right() {
    return new Point(this.x + this.width, this.y + (this.height / 2))
  }
  bottom() {
    return new Point(this.x + (this.width / 2), this.y + this.height)
  }
  center() {
    return new Point(this.x + (this.width / 2), this.y + (this.height / 2))
  }
  topLeft() {
    return new Point(this.x, this.y)
  }
  topRight() {
    return new Point(this.x + this.width, this.y)
  }
  bottomLeft() {
    return new Point(this.x, this.y + this.height)
  }
  bottomRight() {
    return new Point(this.x + this.width, this.y + this.height)
  }
}

export default Rectangle
