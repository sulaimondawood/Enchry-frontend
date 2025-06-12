"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Square,
  Thermometer,
  Droplet,
  MapPin,
  Clock,
  Wifi,
  WifiOff,
  RotateCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toggleDeviceStatus } from "@/services/api/simulation";
import { useSearchParams } from "next/navigation";
import { toast as toastMsg } from "sonner";
import { queryClient } from "@/services/providers/tanstack-provider";
import {
  generateDeviceKeyPairs,
  getDeviceGeoPoints,
  toSodiumByteArray,
} from "@/utils";
import { api } from "@/services/api";
import { decryptSensorData, encryptSensorData } from "@/hooks/use-encryption";
import { getLatestClimateReading, getSystemKey } from "@/services/api/climate";
import { Loader } from "@/components/loader/Loader";
import { format } from "date-fns";

interface DeviceSimulatorProps {
  device: IDevice;
}

export function DeviceSimulator({ device }: DeviceSimulatorProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const controllerRef = useRef(new AbortController());
  const deviceID = searchParams.get("device") || "";

  const { mutate, isPending: isLoadingDeviceStatus } = useMutation({
    mutationFn: async ({
      status,
      devicePublicKey,
    }: {
      status: boolean;
      devicePublicKey: string;
    }) => toggleDeviceStatus(deviceID, status, devicePublicKey),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["devices", "all"],
      });
      toastMsg("Device status updated");
    },
  });

  const { data: fetchAndStoreSystemPublicKey } = useQuery({
    queryKey: ["system", "key"],
    queryFn: async () => {
      const key = localStorage?.getItem("key");

      if (key) {
        const parsed = JSON.parse(key);
        return new Uint8Array(Object.values(parsed));
      } else {
        const systemPublicKey = await getSystemKey();
        const systemPublicKeyToByteArray = await toSodiumByteArray(
          systemPublicKey
        );
        localStorage.setItem("key", JSON.stringify(systemPublicKeyToByteArray));
        return systemPublicKeyToByteArray;
      }
    },
    enabled: !!deviceID,
  });

  const {
    data: latestClimateReading,
    isLoading: isLoadingLatestClimateReading,
    refetch: handleLatestClimateRefetch,
  } = useQuery({
    queryKey: ["climate", "latest"],
    queryFn: async () => {
      const { sensoredData, nonce, ...rest } = await getLatestClimateReading();

      console.log(rest);

      const deviceKeyPair = await generateDeviceKeyPairs(deviceID);

      if (!fetchAndStoreSystemPublicKey) {
        toastMsg.error("Server public key is missing");
      }

      const decryptedData = await decryptSensorData(
        {
          cipherText: sensoredData,
          nonce,
        },
        deviceKeyPair,
        fetchAndStoreSystemPublicKey!
      );

      console.log("decrpyted");

      return {
        sensoredData: decryptedData,
        ...rest,
      };
    },
    enabled: !!deviceID,
  });

  console.log(latestClimateReading);

  //Get data from open-metro
  const { mutate: fetchAndStoreClimateData, isPending: isLoading } =
    useMutation({
      mutationFn: async (): Promise<void> => {
        const locationData = sessionStorage.getItem("location");

        if (!locationData) {
          toastMsg.error("Location not found");
          throw new Error("Location missing from sessionStorage");
        }

        const { lat, long } = JSON.parse(locationData);

        const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: lat,
            longitude: long,
            current: ["temperature_2m", "relative_humidity_2m"],
          },
        });

        const {
          current: { temperature_2m, relative_humidity_2m },
        } = res.data;

        let deviceKeypair;

        if (deviceID) {
          deviceKeypair = await generateDeviceKeyPairs(deviceID);
          sessionStorage.setItem(
            "devicePublicKey",
            JSON.stringify(deviceKeypair.publicKey)
          );
        } else {
          throw new Error("No device ID found");
        }

        toastMsg.info("Encrypting data...");

        if (!fetchAndStoreSystemPublicKey) {
          toastMsg.error("Server public key is missing");
          throw new Error("Server public key not found");
        }

        const { ciphertext, nonce } = await encryptSensorData(
          temperature_2m,
          relative_humidity_2m,
          fetchAndStoreSystemPublicKey,
          deviceKeypair
        );

        const createRes = await api.post("/climate", {
          sensoredData: ciphertext,
          nonce,
          time: res?.data?.current?.time,
          deviceId: deviceID,
          timezone: res.data.timezone || "",
          longitude: res?.data?.longitude,
          latitude: res?.data?.latitude,
        });

        return createRes.data;
      },
      onSuccess: () => {
        toastMsg.success("Climate data saved");
        handleLatestClimateRefetch();
        queryClient.invalidateQueries({ queryKey: ["climate", "latest"] });
      },
      onError: (err) => {
        toastMsg.error("Failed to store climate data");
      },
    });

  // Function to manually abort the request
  const handleCancel = () => {
    controllerRef.current.abort();
    toast({
      title: "Scan Stopped",
      description: "Sensor scanning has been stopped",
    });
  };

  const handleToggleDevieStatus = async (
    status: boolean,
    devicePublicKey: string
  ) => {
    const stored = sessionStorage?.getItem("location");
    const location: { lat: string; long: string } =
      stored && JSON.parse(stored);

    if (!location && status) {
      getDeviceGeoPoints((coords) => {
        sessionStorage.setItem("location", JSON.stringify(coords));
        mutate({
          status,
          devicePublicKey: localStorage.getItem("devicePublicKey")!,
        }); // Only call mutate after getting location
      });
    } else {
      mutate({
        status,
        devicePublicKey: localStorage.getItem("devicePublicKey")!,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {device?.active ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              {device.deviceName}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              Africa, Nigeria
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={device.active ? "default" : "secondary"}>
              {device.active ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline">
              {device.sensorType === "BOTH"
                ? "T & H"
                : device.sensorType === "TEMP"
                ? "Temp"
                : "Humidity"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Device Controls */}
        <div className="flex gap-3">
          <Button
            onClick={() => fetchAndStoreClimateData()}
            disabled={!device.active || isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Scan
              </>
            )}
          </Button>

          {isLoading && (
            <Button onClick={handleCancel} variant="outline">
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          )}

          {device.active ? (
            <Button
              onClick={() =>
                handleToggleDevieStatus(
                  false,
                  localStorage.getItem("devicePublicKey") || ""
                )
              }
              variant="outline"
              disabled={isLoadingDeviceStatus}
              className="disabled:cursor-not-allowed"
            >
              {isLoadingDeviceStatus ? "Deactivating..." : "Deactivate"}
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleToggleDevieStatus(
                  true,
                  localStorage.getItem("devicePublicKey") || ""
                )
              }
              variant="outline"
              disabled={isLoadingDeviceStatus}
              className="disabled:cursor-not-allowed"
            >
              {isLoadingDeviceStatus ? "Activating..." : "Activate"}
            </Button>
          )}
        </div>

        {/* Sensor Readings */}
        {isLoadingLatestClimateReading ? (
          <Loader />
        ) : (
          latestClimateReading && (
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Latest Reading
              </h4>

              <div className="grid grid-cols-1 gap-4">
                {latestClimateReading?.sensoredData?.temperature && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Temperature</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {latestClimateReading?.sensoredData?.temperature}
                            °C
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(
                              latestClimateReading?.timestamp,
                              "dd-MM-yyyy"
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {latestClimateReading?.sensoredData?.humidity && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplet className="h-5 w-5 text-teal-500" />
                          <span className="font-medium">Humidity</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {latestClimateReading?.sensoredData?.humidity}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(
                              latestClimateReading?.timestamp,
                              "dd-MM-yyyy"
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )
        )}

        {/* Device Info */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Device Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Coordinates:</span>
              <div>
                {latestClimateReading?.latitude.toFixed(4)},{" "}
                {latestClimateReading?.longitude.toFixed(4)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Sensor Type:</span>
              <div className="capitalize">
                {device.sensorType === "BOTH"
                  ? "Temperature & Humidity"
                  : device.sensorType === "TEMP"
                  ? "Temperature"
                  : "Humidity"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
