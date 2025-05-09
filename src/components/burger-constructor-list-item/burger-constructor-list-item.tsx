import React, { useRef } from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IIngredientData from "../../types/interfaces/ingridient-data.interface";
import styles from './burger-constructor-list-item.module.css';
import { useAppDispatch } from '../../store/hooks';
import { removeIngredient } from '../../store/slices/constructor-slice';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

type Ttype = 'top' | 'bottom'

const map: Record<Ttype, string> = {
  top: ' (верх)',
  bottom: ' (низ)'
}

interface DragItem {
  index: number;
  type: string;
}

interface IBurgerConstructorListItemProps {
  ingridient: IIngredientData;
  type?: "top" | "bottom";
  isLocked?: boolean;
  index: number;
  onRemove: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerConstructorListItem: React.FC<IBurgerConstructorListItemProps> = ({ 
  ingridient, 
  type, 
  isLocked, 
  index, 
  onRemove,
  moveCard 
}) => {
  const dispatch = useAppDispatch();
  const { name, price, image } = ingridient;
  const finalText = type ? name + map[type] : name;
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: 'ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: () => {
      return { index, type: 'ingredient' };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  const handleRemove = () => {
    if (typeof index === 'number') {
      dispatch(removeIngredient(index));
    }
  };

  return (
    <li 
      ref={ref} 
      className={styles.burgerConstructorIngridient}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <button
        className={styles.burgerConstructorMoveButton}
        aria-label="Open task menu"
        aria-haspopup="true"
      >
        <DragIcon type="primary" className={styles.burgerConstructorDragIcon}/>
      </button>
      <ConstructorElement
        text={finalText}
        price={price}
        thumbnail={image}
        isLocked={isLocked}
        type={type}
        handleClose={onRemove || handleRemove}
      />
      <div className={styles.scrollAreaGap}></div>
    </li>
  );
};

export default BurgerConstructorListItem;