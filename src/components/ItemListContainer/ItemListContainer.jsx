import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";

export const ItemListContainer = ({ titulo }) => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams(); // <- viene de /category/:categoryId

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        if (categoryId) {
          setProducts(data.filter((p) => p.category === categoryId));
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.error(err));
  }, [categoryId]);

  return (
    <section className="home-hero">
      <div className="home-hero__overlay">
        <div className="home-hero__content">
          <h1>{titulo}</h1>
          <ItemList lista={products} />
        </div>
      </div>
    </section>
  );
};
