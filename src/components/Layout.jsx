import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import useTheme from "../hooks/useTheme";

const Layout = () => {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";

    return (
        <main
            className={`min-h-screen transition-colors duration-300 ${isDark
                    ? "dark bg-[radial-gradient(circle_at_top_right,_#665875_0%,_#293d66_35%,_#172744_70%,_#101b30_100%)]"
                    : "light bg-[radial-gradient(circle_at_top_right,_#e8ddf0_0%,_#dbe7f7_35%,_#edf3fa_70%,_#f8fafc_100%)]"
                }`}
        >
            <Navbar
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <Outlet />
        </main>
    );
};

export default Layout;