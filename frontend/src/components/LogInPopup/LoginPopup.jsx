import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { toast } from "react-toastify"

//eslint-disable-next-line
const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken, loadCart } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const valid_res_status = [200, 201]

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newURL = url + "/api/user";
        if (currState === "Login") {
            newURL += "/login";
        } else {
            newURL += "/register";
        }

        try {
            const response = await axios.post(newURL, data);

            if (valid_res_status.indexOf(response.status) !== -1) {
                setToken(response.data.token);
                console.log("entrou1");
                localStorage.setItem("token", response.data.token);
                await loadCart(response.data.token);
                setShowLogin(false);
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)   
        }
    };

    return (
        <div className="login-popup">
            <form
                onSubmit={onLogin}
                action=""
                className="login-popup-container"
            >
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? (
                        <></>
                    ) : (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">
                    {currState === "Sign up" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>
                        By continuing, I agree to the terms of use & privacy
                        policy.
                    </p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrState("Sign up")}>
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrState("Login")}>
                            login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
