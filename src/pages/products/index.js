import "./products.css";
import dataSet from "../../utility/data.json";
import { useCart } from "../../context/cartContext";

function ProductCard(props) {
  const { id, image, name, brand, price, mrp } = props;
  const { state, dispatch } = useCart();

  const handleAddToCart = () => {
    const index = state.cart.find((item) => item.id === id);
    if (!index) {
      let payload = {
        id,
        image,
        name,
        brand,
        price,
        mrp,
        quantity: 1,
      };
      dispatch({ type: "ADD_TO_CART", payload });
    }
  };

  const handleAddToWishlist = () => {
    const index = state.wishlist.find((item) => item.id === id);
    if (!index) {
      let payload = {
        id,
        image,
        name,
        brand,
        price,
        mrp,
      };
      dispatch({ type: "ADD_TO_WISHLIST", payload });
    }
  };

  return (
    <div className="product">
      <img className="banner" src={image} alt="product_image" />
      <h3 className="brand">{brand}</h3>
      <h2 className="name">{name}</h2>

      <span className="price">&#8377; {price}</span>
      <span className="mrp">&#8377; {mrp}</span>
      <span className="discount">50% Discount</span>

      <img
        className="assured"
        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
        alt="assured"
      />
      <h2 className="sizes">Size: S, M, L, XL, XXL</h2>
      <button className="btn btn--save" onClick={handleAddToWishlist}>
        Save for Later
      </button>
      <button className="btn btn--add" onClick={handleAddToCart}>
        <i className="fa-solid fa-cart-arrow-down"></i>
        Add to Cart
      </button>
    </div>
  );
}

export default function Products() {
  return (
    <div className="products">
      {dataSet["products"].map((item) => {
        return <ProductCard key={item.id} {...item} />;
      })}
    </div>
  );
}
