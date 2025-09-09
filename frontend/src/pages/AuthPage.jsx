import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLoginpage, setLoginpage] = useState(true);
  const { isLogin, Login } = useAuth();

  const navigate = useNavigate();

  const toggleAuthModeHandler = () => {
    setLoginpage((prevState) => !prevState);
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/generate");
    }
  }, [isLogin]);

  const handleAuthSubmit = async (formData) => {
    if (isLoginpage) {
      try {

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        toast.success(res.data.message);

        const token = res.data.token;
        const user = res.data?.userInfo[0];

        if (user && token) {
          Login(user, token);
          navigate("/generate");
        } else {
          toast.error("Login failed: Invalid response from server.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );

        toast.success(res.data.message);
        setLoginpage(true);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1D2B53] flex items-center justify-center p-4 font-[Poppins]">
      <div className="w-full max-w-md">
        <div className="bg-[#2B2A4C] border border-[#453558] rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-[#EAE8FF] mb-2">
            {isLoginpage ? "Welcome Back!" : "Create an Account"}
          </h2>
          <p className="text-center text-[#EAE8FF]/70 mb-8">
            {isLoginpage
              ? "Log in to generate some images"
              : "Get started with our AI"}
          </p>

          <AuthForm isLogin={isLoginpage} onSubmit={handleAuthSubmit} />

          <div className="mt-6 text-center">
            <button
              onClick={toggleAuthModeHandler}
              className="text-[#EAE8FF]/70 hover:text-[#EAE8FF] hover:underline transition-colors cursor-pointer"
            >
              {isLoginpage
                ? "Don't have an account? Sign Up"
                : "Already have an an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
