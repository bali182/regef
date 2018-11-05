import React, { HTMLProps } from 'react'
import { selectedNodeStyle, normalNodeStyle } from './styles'

type OwnProps = {
  id: string
  x: number
  y: number
  children: React.ReactNode
  selected: boolean
}

type NodeViewProps = OwnProps & HTMLProps<HTMLDivElement>

const NodeView = ({ id, x, y, selected, children, ...rest }: NodeViewProps) => {
  const nodeStyle = selected ? selectedNodeStyle : normalNodeStyle
  return (
    <div style={{ ...nodeStyle, top: y, left: x }} {...rest}>
      <span>{id}</span>
      {children}
    </div>
  )
}

export default NodeView
