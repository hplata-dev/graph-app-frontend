import React, { useState } from 'react';
import FormCard from './FormCard';
import GraphCanvas from './GraphCanvas';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableItem({ id, position, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    transform: CSS.Transform.toString(transform),
    zIndex: 10,
    cursor: isDragging ? 'grabbing' : 'grab',
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
