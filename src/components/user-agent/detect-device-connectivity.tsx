"use client";
import useDetectInternetConnection from "@/hooks/use-detect-internet-connection";
import { toast } from "@/hooks/use-toast";
import React, { useEffect } from "react";

const DetectDeviceConnectivity = () => {
  const { isOnline } = useDetectInternetConnection();

  useEffect(() => {
    if (isOnline) {
      toast({
        title: "You're offline",
        description: "Kindly turn on your connection",
      });
    }
  }, [isOnline]);

  return null;
};

export default DetectDeviceConnectivity;
