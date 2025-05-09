import React from 'react'
import { Handle, Position } from '@xyflow/react'
function CustomNodes() {

  return (
    <div>
        <Handle type="source" position={Position.Top} />
        <div className="bg-white rounded-lg p-4">
            <h1 className="text-2xl font-bold">Custom Nodes</h1>
        </div>
        <Handle type="target" position={Position.Bottom} />
    </div>
  )
}

export default CustomNodes



export const ParentPublicNode = () => {
    return (
        <div>
            
        </div>
    )
}

export const ChildPublicNode = () => {
    return (
        <div>
            <Handle type="source" position={Position.Top} />
        </div>
    )
}

