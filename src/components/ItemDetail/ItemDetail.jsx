import { Item } from "../Item/Item";
import { useCart } from "../../context/CartContext"; // 👈 importar el contexto
import "./ItemDetail.css";

export const ItemDetail = ({ detail }) => {
  const { addItem } = useCart();

  if (!detail) return null;

  return (
    <div className="detail-container">
      <Item {...detail}>
        <button onClick={() => addItem(detail, 1)}>Enviar al carrito</button>
      </Item>
    </div>
  );
};
