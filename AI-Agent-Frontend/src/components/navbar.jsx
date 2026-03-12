import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const user = useMemo(() => {
        try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
        return null;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <div className="navbar bg-base-200">
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
            AutoTriage AI 🤖
            </Link>
        </div>
        <div className="flex gap-2">
            {!token ? (
            <>
                <Link to="/signup" className="btn btn-sm">
                Signup
                </Link>
                <Link to="/login" className="btn btn-sm">
                Login
                </Link>
            </>
            ) : (
            <>
                <p>Hi, {user?.email}</p>
                {user && user?.role === "admin" ? (
                <Link to="/admin" className="btn btn-sm">
                    Admin
                </Link>
                ) : null}
                <button onClick={logout} className="btn btn-sm">
                Logout
                </button>
            </>
            )}
        </div>
        </div>
    );
}
