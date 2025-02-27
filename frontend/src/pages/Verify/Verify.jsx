import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify"

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.post(url + "/api/order/verify", {
                    success,
                    orderId,
                });
                if (response.status === 200) {
                    toast.success(response.data.message)
                    navigate("/myorders");
                }
            } catch (error) {
                toast.error(error.response.data.message)
                navigate("/");
            }
        };

        verifyPayment();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
