import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import UserService from "../API/UserFetch";
import { useAxios } from "../hooks/useAxios";

const PeoplesContext = createContext();

export const PeoplesContextProvider = ({ children }) => {
  const [admins, setAdmins] = useState();
  const [fetchGetAdmins, isAdminsLoading, AdminsError] = useAxios(async () => {
    const fetchedAdmins = await UserService.getADMINS();
    setAdmins(fetchedAdmins.data?.admins);
  });

  useEffect(() => {
    fetchGetAdmins();
  }, []);

  const handleAdminsRefresh = useCallback(() => {
    fetchGetAdmins();
  }, [fetchGetAdmins]);

  const [users, setUsers] = useState();
  const [fetchGetUsers, isUsersLoading, UsersError] = useAxios(async () => {
    const fetchedUsers = await UserService.getUsers();
    setUsers(fetchedUsers.data?.users);
  });

  useEffect(() => {
    fetchGetUsers();
  }, []);

  const handleUsersRefresh = useCallback(() => {
    fetchGetUsers();
  }, [fetchGetUsers]);

  return (
    <PeoplesContext.Provider
      value={{
        admins,
        setAdmins,
        handleAdminsRefresh,
        isAdminsLoading,
        AdminsError,
        users,
        setUsers,
        handleUsersRefresh,
        isUsersLoading,
        UsersError,
      }}
    >
      {children}
    </PeoplesContext.Provider>
  );
};

export const usePeoplesContext = () => useContext(PeoplesContext);
