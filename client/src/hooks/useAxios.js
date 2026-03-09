import { useState } from "react";

export const useAxios = (callback, errorCallback = (e) => console.error(e)) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const axiosing = async (...args) => {
    try {
      setIsLoading(true);
      return await callback(...args);
    } catch (e) {
      setError(e.message);
      return await errorCallback(e, ...args);
    } finally {
      setIsLoading(false);
    }
  };

  return [axiosing, isLoading, error];
};
