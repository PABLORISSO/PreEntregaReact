import { Link } from "react-router-dom";
import "./Item.css";

export const Item = ({ name, price, description, imageUrl, image, children }) => {
  // Soportar tanto `image` (desde products.json) como `imageUrl`.
  const src = image ?? imageUrl ?? "/images/placeholder.svg";

  // Mejorar alt y el texto de descripción
  const altText = name ?? description ?? "producto";

  const handleImgError = (e) => {
    if (e?.currentTarget) e.currentTarget.src = "/images/placeholder.svg";
  };

  return (
    <article className="product-item">
      <img src={src} alt={altText} onError={handleImgError} />
      <h2 className="product-title">{name}</h2>
      <p>Precio: ${price}</p>
      <p>Descripción: {description}</p>
      {children}
    </article>
  );
};
