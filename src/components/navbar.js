import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar xs-s border--btm">
        <section className="start">
          <Link to="/" className="start link__style">
            <img
              className="logo"
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              alt="logo"
            />
          </Link>
        </section>
        <section className="end">
          <Link to="/wishlist" className="link">
            <i className="fa-solid fa-heart"></i>
          </Link>
          <Link to="/cart" className="link">
            <i className="fa-solid fa-cart-arrow-down"></i>
          </Link>
        </section>
      </nav>
    </div>
  );
}
