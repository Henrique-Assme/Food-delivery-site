import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StoreContext = createContext(null);
export { StoreContext };

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";
    const [foodList, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const loadCart = async (token) => {
        const response = await axios.get(url + "/api/cart", {
            headers: { token: token },
        });
        setCartItems(response.data.cartData);
    };

    const addToCart = async (itemId) => {
        if (token) {
            if (!cartItems[itemId]) {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: 1,
                }));
            } else {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: prev[itemId] + 1,
                }));
            }
            await axios.patch(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );
        } else {
            toast.error("You should login first");
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };

            if (updatedCart[itemId] - 1 === 0) {
                delete updatedCart[itemId];
            } else {
                updatedCart[itemId] -= 1;
            }

            return updatedCart;
        });
        if (token) {
            await axios.patch(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    };

    const deliveryFee = 2;

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCart(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        foodList,
        cartItems,
        deliveryFee,
        url,
        token,
        loadCart,
        setToken,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {/*eslint-disable-next-line */}
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
