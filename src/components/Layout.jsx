import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#665875_0%,_#293d66_35%,_#172744_70%,_#101b30_100%)] text-white">
            <Navbar />

            {/* //aktif route'un component'ini buraya yerleştirir. */}
            <Outlet />
        </main>
    );
};

export default Layout;