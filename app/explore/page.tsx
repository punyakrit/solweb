"use client"
import React, { useCallback, useEffect, useState } from "react";
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
import CustomNodes, {
  ChildPublicNode,
  ParentPublicNode,
} from "@/components/explore/CustomNodes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const nodeTypes = {
  CustomNodes: CustomNodes,
  ParentPublicNode: ParentPublicNode,
  ChildPublicNode: ChildPublicNode,
};
const initialNodes = [
  {
    id: "node-1",
    type: "ParentPublicNode",
    position: { x: 100, y: 500 },
    data: { value: 123 },
  },
];
const initialEdges: any[] = [
  // { id: "e1-2", source: "node-1", target: "node-2", animated: true, style: {stroke: 'red', strokeWidth: 2} },
];

function page() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [address, setAddress] = useState<string>("");


  const searchParams = useSearchParams();
    const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    const addressValue = searchParams.get("address") || "";
    setAddress(addressValue);
    
    setNodes((nodes) => 
      nodes.map(node => 
        node.id === "node-1" 
          ? { ...node, data: { ...node.data, address: addressValue } } 
          : node
      )
    );
  }, [searchParams, setNodes]);

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
