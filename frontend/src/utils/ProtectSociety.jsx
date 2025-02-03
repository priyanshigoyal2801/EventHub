import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import GetTokenData from "./GetTokenData";

const ProtectSociety = () => {
  const [isSociety, setIsSociety] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsSociety(false);
        return;
      }

      try {
        const tokenData = await GetTokenData();
        setIsSociety(tokenData?.decoded?.type === "Society");
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        setIsSociety(false);
      }
    };

    fetchData();
  }, [token]);

  if (isSociety === null) {
    return <p>Loading...</p>; // Prevents early rendering before data is fetched
  }

  return isSociety ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectSociety;