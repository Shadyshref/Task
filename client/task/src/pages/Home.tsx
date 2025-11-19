import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage("en");
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    dispatch(login());
    navigate("/dashboard");
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 bg-blue-700 text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
        {t("Welcome to the Home Page")}
      </h1>

      <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-center max-w-xl">
        {isLoggedIn
          ? "You are logged in."
          : "Please log in to access the dashboard."}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {!isLoggedIn && (
          <button
            onClick={handleLogin}
            className="bg-green-500 cursor-pointer hover:bg-green-600 transition-colors px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg md:text-xl font-semibold shadow-lg flex items-center gap-2"
          >
            <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
