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
import { Progress } from "@/components/ui/progress";
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
import { SimulatedDevice } from "../page";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

interface DeviceSimulatorProps {
  device: SimulatedDevice;
  onDeviceUpdate: (device: SimulatedDevice) => void;
}

interface WeatherData {
  temperature: number;
  humidity: number;
}

export function DeviceSimulator({
  device,
  onDeviceUpdate,
}: DeviceSimulatorProps) {
  const { toast } = useToast();
  const controllerRef = useRef(new AbortController());

  const toggleDeviceStatus = () => {
    const updatedDevice: SimulatedDevice = {
      ...device,
      status: device.status === "active" ? "inactive" : "active",
    };
    onDeviceUpdate(updatedDevice);
  };

  //Get data from open-metro
  const {
    data: climateDataFetch,
    refetch,
    isFetching: isLoading,
  } = useQuery({
    queryKey: ["open-metro", "api"],
    queryFn: async ({ signal }) => {
      const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: 52.52,
          longitude: 13.41,
          current: ["temperature_2m", "relative_humidity_2m"],
        },
        signal: signal || controllerRef.current.signal,
      });
      return res.data;
    },
    enabled: false,
    retry: false,
  });

  // const {} = useMutation({
  //   mutationFn:async()
  // })

  //Manually Fetch
  const handleClimateDataFetch = () => {
    refetch();
    controllerRef.current = new AbortController(); // Reset for future requests
  };

  // Function to manually abort the request
  const handleCancel = () => {
    controllerRef.current.abort();
    toast({
      title: "Scan Stopped",
      description: "Sensor scanning has been stopped",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {device.status === "active" ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              {device.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {device.location}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={device.status === "active" ? "default" : "secondary"}
            >
              {device.status}
            </Badge>
            <Badge variant="outline">
              {device.type === "both"
                ? "T & H"
                : device.type === "temperature"
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
            onClick={handleClimateDataFetch}
            disabled={isLoading || device.status === "inactive"}
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

          <Button onClick={toggleDeviceStatus} variant="outline">
            {device.status === "active" ? "Deactivate" : "Activate"}
          </Button>
        </div>

        {/* Sensor Readings */}
        {device.lastReading && (
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Latest Reading
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {device.lastReading.temperature !== undefined && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Temperature</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {device.lastReading.temperature}°C
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {device.lastReading.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {device.lastReading.humidity !== undefined && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-5 w-5 text-teal-500" />
                        <span className="font-medium">Humidity</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {device.lastReading.humidity}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {device.lastReading.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Device Info */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Device Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Coordinates:</span>
              <div>
                {/* {device.latitude.toFixed(4)}, {device.longitude.toFixed(4)} */}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Sensor Type:</span>
              <div className="capitalize">{device.type}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
