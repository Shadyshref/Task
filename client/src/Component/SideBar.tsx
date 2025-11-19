import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Home, Calendar, Lightbulb, Megaphone, LogOut, Menu } from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  // style helper for each link
  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
      isActive(path)
        ? "bg-white text-black"
        : "text-white hover:bg-white hover:text-blue-700"
    }`;

  return (
    <aside
      className={`bg-gray-800 text-white flex flex-col p-4 h-screen
        transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-8 flex items-center justify-center hover:bg-gray-600 p-2 rounded"
      >
        <Menu size={24} />
      </button>

      <nav className="flex flex-col gap-4 flex-1">
        <Link to="/dashboard" className={linkClasses("/dashboard")}>
          <Home />
          {!collapsed && "Dashboard"}
        </Link>
        <Link to="/schedule" className={linkClasses("/schedule")}>
          <Calendar />
          {!collapsed && "Schedule"}
        </Link>
        <Link to="/examstipes" className={linkClasses("/examstipes")}>
          <Lightbulb />
          {!collapsed && "Exams Tips"}
        </Link>
        <Link to="/announcement" className={linkClasses("/announcement")}>
          <Megaphone />
          {!collapsed && "Announcement"}
        </Link>
      </nav>

      <div className="mt-auto flex items-center gap-2">
        <LogOut />
        {!collapsed && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600  cursor-pointer px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
