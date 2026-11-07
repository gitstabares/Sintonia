import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function LayoutPublico({
  datos,
  en,
  alternarIdioma,
  alternarTexto
}) {
  return (
    <div className="sitio">
      <Navbar
        {...datos}
        en={en}
        alternarIdioma={alternarIdioma}
        alternarTexto={alternarTexto}
      />
      <main>
        <Outlet />
      </main>
      <Footer
        {...datos}
      />
    </div>
  );
}
