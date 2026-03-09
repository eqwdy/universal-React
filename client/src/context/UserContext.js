import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import UserService from "../API/UserFetch";
import { useAxios } from "../hooks/useAxios";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [primaryLoading, setPrimaryLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(null);

  const [axiosUser, isUserLoading, userError] = useAxios(
    async () => {
      const response = await UserService.check();
      setUser(response?.data?.user);
      setIsAuth(true);
    },
    (e) => {
      setIsAuth(false);
    },
  );

  const loadUser = useCallback(async () => {
    await axiosUser();
    setPrimaryLoading(false);
  }, [axiosUser]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAuth(null);
    }
  }, [user]);

  const [axiosLogout] = useAxios(async () => {
    await UserService.logout();
    setUser(null);
    setIsAuth(false);
  });

  const logoutHandler = async (e) => {
    await axiosLogout();
  };

  const isAdmin = user?.role === "ADMIN" || user?.role === "OWNER";
  const isOwner = user?.role === "OWNER";

  return (
    <UserContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isUserLoading,
        userError,
        isAdmin,
        user,
        loadUser,
        logoutHandler,
        primaryLoading,
        isOwner,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
