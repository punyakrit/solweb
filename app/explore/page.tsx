"use client";
import React, { useCallback, useState } from "react";
import {
  MiniMap,
  Background,
  ReactFlow,
  Controls,
  Edge,
  useEdgesState,
  useNodesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Header from "@/components/Header";
import CustomNodes from "@/components/explore/CustomNodes";

const nodeTypes = {
  CustomNodes: CustomNodes,
};
const initialNodes = [
    {
      id: 'node-1',
      type: 'CustomNodes',
      position: { x: 100, y: 500 },
      data: { value: 123 },
    },
    {
      id: 'node-2',
      type: 'CustomNodes',
      position: { x: 100, y: 100 },
      data: { value: 123 },
    },

  ];
  const initialEdges: any[] = [
    { id: "e1-2", source: "node-1", target: "node-2", animated: true, style: {stroke: 'red', strokeWidth: 2} },
  ];

function page() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="text-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Header />
      </ReactFlow>
    </div>
  );
}

export default page;
