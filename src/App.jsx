import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Hero from "./pages/Hero";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import About from "./pages/About";
import AddProduct from "./components/AddProduct";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";

const NavbarLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<NavbarLayout />}>
          <Route path="/home" element={<Hero />} />
          <Route path="/pro" element={<AddProduct />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
