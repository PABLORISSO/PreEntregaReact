import { Nav } from "../Nav/Nav";
import "./Header.css";

export const Header = () => {
  return (
    <header className="app-header">
      <h2>Kapital Sociedad de Bolsa</h2>
      <Nav />
    </header>
  );
};
