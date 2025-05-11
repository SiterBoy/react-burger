import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import IIngredientData from '../types/interfaces/ingridient-data.interface';

export const useDragDrop = (type: string, onDrop?: (item: IIngredientData) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop<IIngredientData, void, { isOver: boolean }>({
    accept: type,
    drop: (item) => {
      if (onDrop) {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag<IIngredientData, void, { isDragging: boolean }>({
    type,
    item: () => ({} as IIngredientData),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return {
    ref,
    isOver,
    isDragging,
    drag,
    drop,
  };
}; 