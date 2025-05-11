import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';

interface DragDropWrapperProps {
  type: string;
  item: IIngredientData;
  onDrop?: (item: IIngredientData) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const DragDropWrapper: React.FC<DragDropWrapperProps> = ({
  type,
  item,
  onDrop,
  children,
  className,
  style,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: type,
    drop: (droppedItem: IIngredientData) => {
      if (onDrop) {
        onDrop(droppedItem);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  const backgroundColor = isOver ? 'rgba(76, 76, 255, 0.1)' : 'transparent';

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={className}
      style={{ ...style, opacity, backgroundColor }}
    >
      {children}
    </div>
  );
}; 