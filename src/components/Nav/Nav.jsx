import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Nav.css";

export const Nav = () => {
  const { totalItems } = useCart();

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item"><Link to="/">Inicio</Link></li>
        <li className="main-nav__item"><Link to="/category/renta-fija">Renta Fija</Link></li>
        <li className="main-nav__item"><Link to="/category/renta-variable">Renta Variable</Link></li>
        <li className="main-nav__item"><Link to="/cart" className="cart-link">🛒 <span className="cart-badge">{totalItems}</span></Link></li>
      </ul>
    </nav>
  );
};

