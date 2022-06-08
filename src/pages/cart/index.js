import "./cart.css";
import { useCart } from "../../context/cartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Empty from "../../components/Empty";

function CartItem({ productDetails }) {
  const { state, dispatch } = useCart();
  let { id, image, brand, name, price, mrp, quantity } = productDetails;
  const navigate = useNavigate();

  const handleDelete = () => {
    let temp = {
      id,
      image,
      name,
      brand,
      price,
      mrp,
      quantity,
    };
    dispatch({ type: "REMOVE_FROM_CART", payload: temp });
  };

  const incItemQty = () => {
    let temp = {
      id,
      image,
      name,
      brand,
      price,
      mrp,
      quantity: ++quantity,
    };
    dispatch({ type: "UPDATE_CART_INC", payload: temp });
  };

  const decItemQty = () => {
    if (quantity > 1) {
      let temp = {
        id,
        image,
        name,
        brand,
        price,
        mrp,
        quantity: --quantity,
      };
      dispatch({ type: "UPDATE_CART_DEC", payload: temp });
    } else {
      handleDelete();
    }
  };

  const handleWishlist = () => {
    const { wishlist } = state;
    const index = wishlist.findIndex((item) => item.id === id);
    if (index === -1) {
      let payload = {
        id,
        image,
        name,
        brand,
        price,
        mrp,
      };
      dispatch({ type: "ADD_TO_WISHLIST", payload });
      handleDelete();
    } else {
      navigate("/wishlist");
    }
  };

  return (
    <div className="cart--item">
      <div className="cart--details">
        <img className="cart--banner" src={image} alt="cart--banner" />
        <div className="details">
          <h3 className="brand">{brand}</h3>
          <h2 className="name">{name}</h2>
          <section className="flex-ct-sb">
            <span className="price">&#8377; {price}</span>
            <span className="mrp">&#8377;{mrp}</span>
            <span className="discount">50% Discount</span>
          </section>
          <img
            className="assured"
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
            alt="assured"
          />
        </div>
      </div>
      <div className="cart--quantity">
        <button className="btn btn--round" onClick={decItemQty}>
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button className="btn btn--round" onClick={incItemQty}>
          +
        </button>
        <button className="btn btn--save" onClick={handleWishlist}>
          {state?.wishlist?.findIndex((item) => item.id === id) !== -1
            ? "Go To Wishlist"
            : "Save for Later"}
        </button>
        <button className="btn btn--delete" onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>Remove Item
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { state } = useCart();

  useEffect(() => {
    setCartItems([...state.cart]);
  }, [state]);

  return (
    <>
      {cartItems.length ? (
        <div className="cart">
          {/* Cart Items with details and buttons */}
          <div className="cart--listing">
            {cartItems.map((item) => {
              return <CartItem key={item.id} productDetails={{ ...item }} />;
            })}
          </div>

          {/* Cart Pricing Details */}
          <div className="cart--pricing">
            <h2>Price Details</h2>
            <hr />
            <h1>
              Price <span className="fl-rt">Rs. {state.price}</span>
            </h1>
            <h1>
              Discount <span className="fl-rt">50%</span>
            </h1>
            <h1>
              Delivery <span className="fl-rt">Rs. 100</span>
            </h1>
            <hr />
            <h1>
              Total <span className="fl-rt">Rs. {state.total}</span>
            </h1>
            <button className="btn btn--add">Place Order</button>
          </div>
          <div className="amount"></div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
}
