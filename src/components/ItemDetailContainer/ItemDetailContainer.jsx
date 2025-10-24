import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el archivo de productos");
        return res.json();
      })
      .then((data) => {
        // Convertimos ambos a número para evitar errores de tipo
        const producto = data.find((p) => Number(p.id) === Number(id));
        setDetail(producto || null);
      })
      .catch((err) => {
        console.error("Error al buscar producto:", err);
        setDetail(null);
      });
  }, [id]);

  return (
    <main>
      {detail ? (
        <ItemDetail detail={detail} />
      ) : (
        <p>Cargando producto...</p>
      )}
    </main>
  );
};
