import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";

// 👇 importa tu contexto
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="page-container">
          <Header />
          {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer titulo={"Cedears disponibles para invertir"} />}
            />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer titulo="CEDEARs por tipo" />} />

          </Routes>
          {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
