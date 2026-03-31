import { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const AuthForm = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      // Error is handled by parent component via toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isLogin && (
        <div className="relative">
          <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-[#EAE8FF]/50" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="w-full bg-[#1D2B53] border border-[#453558] rounded-lg py-3 pl-10 pr-4 text-[#EAE8FF] placeholder-[#EAE8FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7A3E9C]"
          />
        </div>
      )}
      <div className="relative">
        <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-[#EAE8FF]/50" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full bg-[#1D2B53] border border-[#453558] rounded-lg py-3 pl-10 pr-4 text-[#EAE8FF] placeholder-[#EAE8FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7A3E9C] font-[JetBrains_Mono]"
        />
      </div>
      <div className="relative">
        <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#EAE8FF]/50" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          onChange={handleChange}
          className="w-full bg-[#1D2B53] border border-[#453558] rounded-lg py-3 pl-10 pr-4 text-[#EAE8FF] placeholder-[#EAE8FF]/50 focus:outline-none focus:ring-2 focus:ring-[#7A3E9C] font-[JetBrains_Mono]"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#7A3E9C] text-white font-bold py-3 rounded-lg hover:shadow-[0_0_15px_0_rgba(122,62,156,0.8)] transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        {isLoading ? (
          <FaSpinner className="animate-spin w-full text-2xl" />
        ) : isLogin ? (
          "Log In"
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default AuthForm;
