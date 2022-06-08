import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";
import Products from "./pages/products";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} exact="true" />
        <Route path="/cart" element={<Cart />} exact="true" />
        <Route path="/wishlist" element={<Wishlist />} exact="true" />
      </Routes>
    </div>
  );
}

export default App;
