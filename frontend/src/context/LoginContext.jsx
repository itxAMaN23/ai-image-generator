import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        setCurrentUser(data);
        setIsLogin(true);
      } else {
        localStorage.removeItem("token");
        setIsLogin(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
      setIsLogin(false);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const Login = (userData, token) => {
    localStorage.setItem("token", token);
    setCurrentUser(userData);
    setIsLogin(true);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setCurrentUser(null);
  };

  const updateUserCredits = (newCreditCount) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, credits: newCreditCount };
      setCurrentUser(updatedUser);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        currentUser,
        updateUserCredits,
        Logout,
        isLoading,
        Login,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(LoginContext);
};
