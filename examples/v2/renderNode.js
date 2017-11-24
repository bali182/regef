import React from 'react'
import ChildNode from './ChildNode'

const renderNode = (id, props) => (<ChildNode id={id} key={id} {...props} />)

export default renderNode
