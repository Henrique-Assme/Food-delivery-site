import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { getTotalCartAmount, deliveryFee, token, foodList, cartItems, url } =
        useContext(StoreContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });
    const totalAmount = getTotalCartAmount();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        foodList.map((item) => {
            if (cartItems[item._id] > 0) {
                let item_info = item;
                item_info["quantity"] = cartItems[item._id];
                orderItems.push(item_info);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: totalAmount + deliveryFee,
        };

        let response = await axios.post(url + "/api/order/place", orderData, {
            headers: { token },
        });
        if (response.status === 200) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Error on proceed to payment");
        }
    };

    useEffect(() => {
        if (!token || totalAmount === 0) {
            navigate("/cart");
        }
        //eslint-disable-next-line
    }, [token, totalAmount]);

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="firstName"
                        value={data.firstName}
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="lastName"
                        value={data.lastName}
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={data.email}
                    type="email"
                    placeholder="Email address"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={data.street}
                    type="text"
                    placeholder="Street"
                />
                <div className="multi-fields">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="city"
                        value={data.city}
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="state"
                        value={data.state}
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="multi-fields">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip code"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={data.country}
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                />
            </div>
            <div className="place-order-right">
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
                            <b>
                                $
                                {totalAmount > 0
                                    ? totalAmount + deliveryFee
                                    : 0}
                            </b>
                        </div>
                    </div>
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
