import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, foodList, removeFromCart, getTotalCartAmount, deliveryFee, url } = useContext(StoreContext);

    const navigate = useNavigate()
    const totalAmount = getTotalCartAmount()

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {foodList.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        let price = item.price;
                        let quantity = cartItems[item._id];
                        let total = price * quantity;
                        return (
                            <>
                                <div
                                    key={index}
                                    className="cart-items-title cart-items-item"
                                >
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${price}</p>
                                    <p>{quantity}</p>
                                    <p>${total}</p>
                                    <p
                                        className="cross"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        x
                                    </p>
                                </div>
                                <hr />
                            </>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>${totalAmount > 0 ? deliveryFee : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${totalAmount > 0 ? totalAmount + deliveryFee : 0}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="promo code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
