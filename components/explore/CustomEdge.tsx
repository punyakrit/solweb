import React from 'react';
import { EdgeProps, getBezierPath } from '@xyflow/react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  label,
  sourceHandleId,
  targetHandleId,
}: EdgeProps) {
  const params = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: sourceHandleId || targetHandleId ? 0.5 : 0.4,
  };

  const [edgePath, labelX, labelY] = getBezierPath(params);

  const labelWidth = label ? Math.max(80, label.toString().length * 14) : 100;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {label && (
        <foreignObject
          width={labelWidth}
          height={30}
          x={labelX - labelWidth / 2}
          y={labelY - 15}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="px-3 py-1 bg-black/80 rounded-md text-white text-center text-xs font-bold shadow-md backdrop-blur-sm border border-gray-700/50">
            {label}
          </div>
        </foreignObject>
      )}
    </>
  );
} 