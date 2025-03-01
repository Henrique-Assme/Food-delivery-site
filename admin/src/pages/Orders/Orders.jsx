import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Orders.css";
import { useEffect } from "react";
import { assets } from "../../assets/admin_assets/assets.js";

//eslint-disable-next-line
const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/allorders");
            if (response.status === 200) {
                setOrders(response.data.data);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const statusHandler = async (orderId, event) => {
        try {
            const response = await axios.put(url + "/api/order/status", {
                orderId,
                status: event.target.value,
            });
            if (response.status === 200) {
                toast.success(response.data.message)
                await fetchOrders();
            }
        } catch (error) {
            toolbar.error(error.response.data.message)
        }
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="order add">
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return (
                                            item.name + " x " + item.quantity
                                        );
                                    } else {
                                        return (
                                            item.name +
                                            " x " +
                                            item.quantity +
                                            ", "
                                        );
                                    }
                                })}
                            </p>
                            <p className="order-item-name">
                                {order.address.firstName +
                                    " " +
                                    order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>{order.address.street + ","}</p>
                                <p>
                                    {order.address.city +
                                        ", " +
                                        order.address.state +
                                        ", " +
                                        order.address.country +
                                        ", " +
                                        order.address.zipcode}
                                </p>
                            </div>
                            <p className="order-item-phone">
                                {order.address.phone}
                            </p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select
                            onChange={(event) =>
                                statusHandler(order._id, event)
                            }
                            value={order.status}
                        >
                            <option value="Food Processing">
                                Food Processing
                            </option>
                            <option value="Out for delivery">
                                Out for delivery
                            </option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
