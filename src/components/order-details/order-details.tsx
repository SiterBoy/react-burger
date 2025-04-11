import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

interface IOrderDetailsProps {
  orderId: number;
}

export const OrderDetails = ({orderId}: IOrderDetailsProps) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large">{orderId}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};