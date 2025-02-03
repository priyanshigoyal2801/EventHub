import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import GetTokenData from "./GetTokenData";

const ProtectAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const tokenData = await GetTokenData(); 
        setIsAdmin(tokenData?.decoded?.type === "Admin");
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        setIsAdmin(false);
      }
    };

    fetchData();
  }, [token]);

  if (isAdmin === null) {
    return <p>Loading...</p>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectAdmin;