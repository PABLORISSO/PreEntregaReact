import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ lista }) => {
  //pasamos el button como children, no es obligatorio

  return (
    <>
      {lista.length ? (
        <div className="product-grid">
          {lista.map((prod) => (
          //como yo reutilizo Item en el detalle, no quiero conflictos de "click"
          //al tocar el boton de "agregar al carrito" y se clickee tambien la card

          //Por eso para evitar poner Link en Item, venimos a ItemList y pasamos
          //Link en el mapeo, con su key, ya que la key va en el componente que retorne el mapeo
          //(y ahora no es Item, sino Link)
          <Link to={`/detail/${prod.id}`} key={prod.id}>
            <Item {...prod} />
          </Link>
          ))}
        </div>
      ) : (
        <p>No hay productos</p>
      )}
    </>
  );
};
