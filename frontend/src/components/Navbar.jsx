import { useAuth } from "../context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiImage, FiGrid } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { FaCoins } from "react-icons/fa";

const Navbar = ({ activePage }) => {
  const navigate = useNavigate();

  const { isLogin, currentUser, Logout, isLoading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const loggedInLinks = (
    <>
      <Link
        to="/generate"
        className={`${"text-gray-300 hover:text-white transition-colors duration-300"} ${
          activePage === "Generate" ? "text-[#8A4FFF] font-semibold" : ""
        }`}
      >
        Generate
      </Link>
      <Link
        to="/my-images"
        className={`${"text-gray-300 hover:text-white transition-colors duration-300"} ${
          activePage === "My Images" ? "text-[#8A4FFF] font-semibold" : ""
        }`}
      >
        My Images
      </Link>
      <Link
        to="/gallery"
        className={`${"text-gray-300 hover:text-white transition-colors duration-300"} ${
          activePage === "Public Gallery" ? "text-[#8A4FFF] font-semibold" : ""
        }`}
      >
        Public Gallery
      </Link>
    </>
  );

  const loggedOutLinks = (
    <Link
      to="/gallery"
      className={`${"text-gray-300 hover:text-white transition-colors duration-300"} ${
        activePage === "Public Gallery" ? "text-[#8A4FFF] font-semibold" : ""
      }`}
    >
      Public Gallery
    </Link>
  );

  return (
    <nav className="bg-[#202142] px-4 sm:px-8 py-4 border-b border-white/10 sticky top-0 z-50 font-[Poppins]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-white">
          ImagiVerse
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {!isLoading && (isLogin ? loggedInLinks : loggedOutLinks)}
        </div>

        <div className="flex items-center">
          {isLoading ? (
            <div className="h-9 w-24 bg-gray-700 rounded-lg animate-pulse"></div>
          ) : isLogin && currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-[#8A4FFF] text-[#8A4FFF] rounded-lg hover:bg-[#8A4FFF] hover:text-white transition-colors duration-200"
              >
                <FiUser />
                <span>{currentUser.name}</span>
                <MdKeyboardArrowDown
                  className={`transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute top-full right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-[#2D2E55] shadow-2xl ring-1 ring-white/10 transition-all duration-200 ease-out ${
                  isDropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="p-2">
                  <div className="px-2 py-1">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="font-medium text-white truncate">
                      {currentUser.name}
                    </p>
                  </div>
                  <hr className="my-2 border-white/10" />
                  <Link
                    to={`/${currentUser.username}`}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-[#8A4FFF]/20 hover:text-white"
                  >
                    <FiUser size={16} />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/my-images"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-[#8A4FFF]/20 hover:text-white"
                  >
                    <FiImage size={16} />
                    <span>My Creations</span>
                  </Link>
                  <Link
                    to="/gallery"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-[#8A4FFF]/20 hover:text-white"
                  >
                    <FiGrid size={16} />
                    <span>Public Gallery</span>
                  </Link>
                  <div className="credit-display flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-[#8A4FFF]/20 hover:text-white select-none">
                    <FaCoins />
                    <span>Credits: {currentUser.credits}</span>
                  </div>
                  <div className="p-2 mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-[#E53E3E] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#C53030]"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 text-sm font-semibold bg-[#8A4FFF] text-white rounded-lg hover:bg-[#7b46e5] transition-colors duration-300"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
