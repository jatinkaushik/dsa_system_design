import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SystemDesignComponent, SystemDesignConnection } from '../../types';

interface SystemDesignCanvasProps {
  components: SystemDesignComponent[];
  connections: SystemDesignConnection[];
}

const CanvasContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
  height: 600px;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ComponentNode = styled.div<{ x: number; y: number; componentType: string }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => {
    switch (props.componentType) {
      case 'client': return '#4CAF50';
      case 'server': return '#2196F3';
      case 'database': return '#FF9800';
      case 'cache': return '#9C27B0';
      case 'loadBalancer': return '#E91E63';
      case 'service': return '#673AB7';
      default: return '#607D8B';
    }
  }};
  transition: box-shadow 0.3s ease;
  z-index: 2;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ComponentTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

const ComponentDescription = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #666;
`;

const ConnectionLabel = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const SystemDesignCanvas: React.FC<SystemDesignCanvasProps> = ({ components, connections }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !svgRef.current) return;

    // Clear previous SVG content
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    // Draw connections
    connections.forEach(connection => {
      const sourceComponent = components.find(c => c.id === connection.source_id);
      const targetComponent = components.find(c => c.id === connection.target_id);

      if (!sourceComponent || !targetComponent) return;

      // Calculate center points of components
      const sourceX = sourceComponent.position.x + 75; // Half of min-width
      const sourceY = sourceComponent.position.y + 30;
      const targetX = targetComponent.position.x + 75;
      const targetY = targetComponent.position.y + 30;

      // Create line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      
      // Create a curved path
      const dx = targetX - sourceX;
      const dy = targetY - sourceY;
      const curve = Math.min(Math.abs(dx), Math.abs(dy)) * 0.5;
      
      // Define the path
      const path = `M ${sourceX} ${sourceY} 
                    C ${sourceX + curve} ${sourceY}, 
                      ${targetX - curve} ${targetY}, 
                      ${targetX} ${targetY}`;
      
      line.setAttribute('d', path);
      line.setAttribute('stroke', connection.type === 'request' ? '#2196F3' : '#FF9800');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('fill', 'none');
      line.setAttribute('marker-end', 'url(#arrowhead)');
      
      if (svgRef.current) {
        svgRef.current.appendChild(line);
      }
    });
  }, [components, connections]);

  return (
    <CanvasContainer ref={canvasRef}>
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%" 
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
          </marker>
        </defs>
      </svg>
      
      {components.map(component => (
        <ComponentNode 
          key={component.id}
          x={component.position.x}
          y={component.position.y}
          componentType={component.type}
        >
          <ComponentTitle>{component.name}</ComponentTitle>
          <ComponentDescription>{component.description}</ComponentDescription>
        </ComponentNode>
      ))}
      
      {connections.map(connection => (
        connection.label && (
          <ConnectionLabel 
            key={connection.id}
            x={(components.find(c => c.id === connection.source_id)?.position.x || 0) + 
               ((components.find(c => c.id === connection.target_id)?.position.x || 0) - 
               (components.find(c => c.id === connection.source_id)?.position.x || 0)) / 2 + 75}
            y={(components.find(c => c.id === connection.source_id)?.position.y || 0) + 
               ((components.find(c => c.id === connection.target_id)?.position.y || 0) - 
               (components.find(c => c.id === connection.source_id)?.position.y || 0)) / 2 + 30}
          >
            {connection.label}
          </ConnectionLabel>
        )
      ))}
    </CanvasContainer>
  );
};

export default SystemDesignCanvas;