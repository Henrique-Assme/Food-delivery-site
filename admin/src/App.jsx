import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const App = () => {
    const API_URL =
        import.meta.env.NODE_ENV === "dev"
            ? "http://localhost:4000"
            : import.meta.env.VITE_API_URL;

    return (
        <div>
            <ToastContainer />
            <Navbar />
            <hr />
            <div className="app">
                <div className="app-content">
                    <Sidebar />
                    <Routes>
                        <Route path="/add" element={<Add url={API_URL} />} />
                        <Route path="/list" element={<List url={API_URL} />} />
                        <Route
                            path="/orders"
                            element={<Orders url={API_URL} />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
