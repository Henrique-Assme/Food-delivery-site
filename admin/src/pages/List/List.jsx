import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { API_URL } from "../../App.jsx";
import { toast } from "react-toastify";

const List = () => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(API_URL + "/api/food/list");
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error");
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.delete(API_URL + "/api/food/remove", {
            data: { id: foodId },
        });
        if (response.data.success) {
            await fetchList();
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <img
                                src={`${API_URL}/images/` + item.image}
                                alt=""
                            />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p
                                onClick={() => removeFood(item._id)}
                                className="cursor"
                            >
                                X
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;
