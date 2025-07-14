"use client";
import { useEffect, useState } from "react";

const useDetectInternetConnection = () => {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" && typeof navigator !== "undefined"
      ? navigator.onLine
      : true
  );

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  return { isOnline };
};

export default useDetectInternetConnection;
