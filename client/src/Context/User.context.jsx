import React, { useContext, createContext, useEffect } from "react";
import authApi from "../interceptors/auth.api";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);

    const fetchUser = async () => {
      try {
        const res = await authApi.get("/me");

        // console.log("UserContext fetch user response:", res);
        if (res) {
          const { data } = res;
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (window.location.pathname !== "/auth") {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
