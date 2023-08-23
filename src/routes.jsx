import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Register from './pages/register';
import Login from "./pages/login";
import Home from "./pages/home";
import Post from "./pages/posts";
import Edit from "./pages/edit";
import { getItem } from "./utils/storage";

function ProtectedRouter({ redirectTo }) {
    const token = getItem('@token');
    return token ? <Outlet /> : <Navigate to={redirectTo} />

}

export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />

                <Route element={<ProtectedRouter redirectTo='/' />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                <Route path="/post/user/:id" element={<Post />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </BrowserRouter>
    );
}
