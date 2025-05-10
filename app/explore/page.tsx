"use client"
import React, { useCallback, useEffect, useState, Suspense } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { getSignatures } from "../actions/getSignatures";
import { getTransactionDetailsBatch } from "../actions/getTransactionDetailsBatch";
import { NodeData } from "../types/flowTypes";
import { CustomEdge } from '@/components/explore/CustomEdge';

const nodeTypes = {
  CustomNodes: CustomNodes,
  ParentPublicNode: ParentPublicNode,
  ChildPublicNode: ChildPublicNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [
  {
    id: "node-1",
    type: "ParentPublicNode",
    position: { x: 100, y: 500 },
    data: { value: 123 },
  },
];

const initialEdges: any[] = [];

// Create a separate client component that uses useSearchParams
function ExploreFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nodePositions, setNodePositions] = useState<Map<string, {x: number, y: number}>>(new Map());
  const [transactionLimit, setTransactionLimit] = useState<number>(5);

  // Import useSearchParams here in this client component
  const { useSearchParams } = require("next/navigation");
  const searchParams = useSearchParams();
  
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const fetchTransactionData = async (addr: string) => {
    if (!addr) return;
    
    setIsLoading(true);
    try {
      const signaturesData = await getSignatures(addr, transactionLimit);
      const signatures = signaturesData.result || [];
      
      if (signatures.length === 0) {
        console.log("No transaction signatures found for this address");
        setIsLoading(false);
        return;
      }
      
      const signatureStrings = signatures
        .map((sig: any) => sig?.signature)
        .filter(Boolean);
      
      console.log(`Fetching ${signatureStrings.length} transactions in batch`);
      
      const txDetailsResults = await getTransactionDetailsBatch(signatureStrings);
      
      let uniqueAddresses = new Set([addr]);
      txDetailsResults.forEach(result => {
        if (result.data?.result?.transaction?.message?.instructions) {
          result.data.result.transaction.message.instructions.forEach((instruction: any) => {
            if (instruction.parsed?.type === "transfer" && instruction.parsed?.info) {
              const { source, destination } = instruction.parsed.info;
              if (source && source !== addr) uniqueAddresses.add(source);
              if (destination && destination !== addr) uniqueAddresses.add(destination);
            }
          });
        }
      });
      
      const totalUniqueAddresses = uniqueAddresses.size;
      
      let newNodes = [
        {
          id: addr,
          type: "ParentPublicNode",
          position: { x: 0, y: 0 },
          data: { value: 123, address: addr }
        }
      ];
      let newEdges: Edge[] = [];
      const addedAddresses = new Set([addr]);
      
      txDetailsResults.forEach((result) => {
        const { signature, data: txData } = result;
        
        if (txData?.result?.transaction?.message?.instructions) {
          const instructions = txData.result.transaction.message.instructions;
          
          instructions.forEach((instruction: any) => {
            if (instruction.parsed?.type === "transfer" && instruction.parsed?.info) {
              const { source, destination, lamports } = instruction.parsed.info;
              console.log(`Transfer: ${source} -> ${destination}, amount: ${lamports}`);
              
              if (source && !addedAddresses.has(source) && source !== addr) {
                const position = getNodePosition(addedAddresses.size, totalUniqueAddresses);
                newNodes.push({
                  id: source,
                  type: "ChildPublicNode",
                  position,
                  data: { 
                    value: 0, 
                    address: source!,
                    isSource: true 
                  } as NodeData
                });
                addedAddresses.add(source);
              }
              
              if (destination && !addedAddresses.has(destination) && destination !== addr) {
                const position = getNodePosition(addedAddresses.size, totalUniqueAddresses);
                newNodes.push({
                  id: destination,
                  type: "ChildPublicNode",
                  position,
                  data: { value: 0, address: destination, isSource: false } as NodeData
                });
                addedAddresses.add(destination);
              }
              
              if (source && destination) {
                const isOutgoing = source === addr;
                const edgeColor = isOutgoing ? '#ff4d4d' : '#4dff4d';
                const sourceNode = isOutgoing ? addr : source;
                const targetNode = isOutgoing ? destination : addr;
                
                const edgeId = `e-${signature}-${newEdges.length}`;
                
                newEdges.push({
                  id: edgeId,
                  source: sourceNode,
                  target: targetNode,
                  type: 'custom',
                  animated: true,
                  label: `${(lamports / 1000000000).toFixed(4)} SOL`,
                  data: { lamports, signature },
                  style: { 
                    stroke: edgeColor, 
                    strokeWidth: 3,
                    strokeDasharray: isOutgoing ? '5 5' : undefined
                  }
                });
              }
            }
          });
        }
      });
      
      console.log(`Created ${newNodes.length} nodes and ${newEdges.length} edges`);
      
      const hasDirectConnectionToMain = new Map<string, boolean>();
      newEdges.forEach(edge => {
        if (edge.source === addr) {
          hasDirectConnectionToMain.set(edge.target, true);
        } else if (edge.target === addr) {
          hasDirectConnectionToMain.set(edge.source, true);
        }
      });
      
      const nodeImportance = new Map<string, number>();
      newEdges.forEach(edge => {
        const nodeId = edge.source === addr ? edge.target : edge.source;
        const currentValue = nodeImportance.get(nodeId) || 0;
        nodeImportance.set(nodeId, currentValue + Number(edge.data?.lamports || 0));
      });
      
      const childNodes = newNodes.slice(1);
      childNodes.sort((a, b) => {
        const aDirectConnection = hasDirectConnectionToMain.get(a.id) || false;
        const bDirectConnection = hasDirectConnectionToMain.get(b.id) || false;
        
        if (aDirectConnection && !bDirectConnection) return -1;
        if (!aDirectConnection && bDirectConnection) return 1;
        
        const aImportance = nodeImportance.get(a.id) || 0;
        const bImportance = nodeImportance.get(b.id) || 0;
        return bImportance - aImportance;
      });
      
      const nodesWithConnections = childNodes.filter(node => {
        return newEdges.some(edge => 
          edge.source === node.id || edge.target === node.id
        );
      });
      
      const maxChildNodes = Math.min(transactionLimit, 10);
      const limitedNodes = [newNodes[0], ...nodesWithConnections.slice(0, maxChildNodes)];
      
      const limitedNodeIds = new Set(limitedNodes.map(node => node.id));
      const limitedEdges = newEdges.filter(edge => 
        limitedNodeIds.has(edge.source) && limitedNodeIds.has(edge.target)
      );
      
      console.log(`Limited from ${newNodes.length} to ${limitedNodes.length} nodes (transaction limit: ${transactionLimit})`);
      console.log(`Connections kept: ${limitedEdges.length} of ${newEdges.length} edges`);
      
      newNodes = limitedNodes;
      newEdges = limitedEdges;
      
      const optimizeNodePositions = (nodes: any[]) => {
        const optimizedNodes = nodes.slice(0, 1);
        const childNodes = nodes.slice(1);
        
        childNodes.sort((a, b) => {
          const aEdge = newEdges.find(e => e.source === a.id || e.target === a.id);
          const bEdge = newEdges.find(e => e.source === b.id || e.target === b.id);
          
          const aValue = aEdge?.data?.lamports || 0;
          const bValue = bEdge?.data?.lamports || 0;
          
          return Number(bValue) - Number(aValue);
        });
        
        const nodeCount = childNodes.length;
        const angleStep = (2 * Math.PI) / nodeCount;
        
        const baseRadius = Math.max(300, nodeCount * 30);
        
        childNodes.forEach((node, i) => {
          const angle = i * angleStep;
          const radius = baseRadius + (i * 15);
          
          node.position = {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
          };
          optimizedNodes.push(node);
        });
        
        return optimizedNodes;
      };
      
      const optimizedNodes = optimizeNodePositions(newNodes);
      setNodes(optimizedNodes);
      setEdges(newEdges);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getNodePosition = (index: number, totalNodes: number) => {
    if (index === 0) {
      return { x: 0, y: 0 };
    }
    
    const angle = ((index - 1) * (2 * Math.PI)) / (totalNodes - 1);
    const radius = 450;
    const jitter = Math.random() * 50 - 25;
    const x = radius * Math.cos(angle) + jitter;
    const y = radius * Math.sin(angle) + jitter;
    
    return { x, y };
  };

  useEffect(() => {
    const addressValue = searchParams.get("address") || "";
    setAddress(addressValue);
    
    setNodes((nodes) => 
      nodes.map(node => 
        node.id === "node-1" 
          ? { ...node, id: addressValue, data: { ...node.data, address: addressValue } } 
          : node
      )
    );
    
    if (addressValue) {
      fetchTransactionData(addressValue);
    }
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
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'custom',
          animated: true
        }}
        onlyRenderVisibleElements={true}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.2}
        maxZoom={4}
        fitView
        fitViewOptions={{ padding: 0.3 }}
      >
        <Header />
        <Controls />
        <div className="absolute top-20 right-5 z-10 flex flex-col gap-2 bg-black/50 p-3 rounded-md">
          <div className="text-white text-sm font-medium">Transaction Limit</div>
          <select 
            value={transactionLimit} 
            onChange={(e) => setTransactionLimit(Number(e.target.value))}
            className="bg-purple-900 text-white border border-purple-500 rounded p-1"
          >
            <option value="2">2 Transactions</option>
            <option value="3">3 Transactions</option>
            <option value="4">4 Transactions</option>
            <option value="5">5 Transactions</option>
            <option value="6">6 Transactions</option>
            <option value="7">7 Transactions</option>
            <option value="8">8 Transactions</option>
            <option value="9">9 Transactions</option>
            <option value="10">10 Transactions</option>
            <option value="15">15 Transactions</option>
          </select>
          <button
            onClick={() => fetchTransactionData(address)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
          >
            Refresh
          </button>
        </div>
      </ReactFlow>
    </div>
  );
}

// Main page component with Suspense
function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white text-xl">Loading...</div>}>
      <ExploreFlow />
    </Suspense>
  );
}

export default Page;
