"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [countUsers, setcountUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  async function getAllUser() {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) return;

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getUsers`, {
        headers: { token },
      });

      if (data.success) {
        setUsers(data.data);
        setcountUsers(data.count);
        console.log("countUsers", data.count);
        console.log("users", data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUser();
  }, [refresh]);

  return (
    <userContext.Provider value={{ getAllUser, users, setRefresh, countUsers, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);
