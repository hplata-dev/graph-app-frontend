import React, { useState } from 'react';
import FormCard from './FormCard';
import GraphCanvas from './GraphCanvas';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'; // Helper for transforms

// This is a wrapper component to make FormCard draggable and control its position.
function DraggableItem({ id, position, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  // Apply the current position and the transform during drag
  const style = {
    position: 'absolute', // Essential for positioning
    left: position.x,
    top: position.y,
    transform: CSS.Transform.toString(transform), // Smooth visual drag
    zIndex: 10, // Ensure it's above the GraphCanvas
    cursor: isDragging ? 'grabbing' : 'grab',
    // You can add other styles, e.g., for when it's being dragged
    // boxShadow: isDragging ? '0px 4px 15px rgba(0,0,0,0.2)' : 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export default function Home() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [formCardPosition, setFormCardPosition] = useState({ x: 50, y: 50 }); 


  function handleDragEnd(event) {
    const { active, delta } = event;

    if (active.id === 'form-card-draggable') {
      setFormCardPosition((prevPosition) => ({
        x: prevPosition.x + delta.x,
        y: prevPosition.y + delta.y,
      }));
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <GraphCanvas graph={graph} />
        </div>
        <DraggableItem id="form-card-draggable" position={formCardPosition}>
          <FormCard setGraph={setGraph} />
        </DraggableItem>
      </div>
    </DndContext>
  );
}
