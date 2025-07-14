"use client";

import React from "react";
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
  Thermometer,
  Droplet,
  MapPin,
  Trash2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

interface RegisteredDevicesListProps {
  devices: IDevice[];
  isDeleting: boolean;
  onDeviceDelete: (deviceId: string) => void;
}

export function RegisteredDevicesList({
  devices,
  onDeviceDelete,
  isDeleting,
}: RegisteredDevicesListProps) {
  const searchParams = useSearchParams();

  const handleOnDeviceSelect = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("device", value);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  if (devices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Devices Registered</CardTitle>
          <CardDescription>
            Register your first IoT device to start simulation
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Thermometer className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Click &quot;Register Device&quot; to add a new sensor
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <Card
          key={device.id}
          className={`cursor-pointer transition-all ${
            searchParams.get("device") === device.id
              ? "ring-2 ring-primary bg-accent/50"
              : "hover:bg-accent/30"
          }`}
          onClick={() => handleOnDeviceSelect(device.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {device.active ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <CardTitle className="text-base">{device.deviceName}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={device.active ? "default" : "secondary"}>
                  {device.active ? "Active" : "Inactive"}
                </Badge>
                <Button
                  disabled={isDeleting}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeviceDelete(device.id);
                  }}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Africa, Nigeria
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  {device.sensorType === "TEMP" ||
                  device.sensorType === "BOTH" ? (
                    <Thermometer className="h-3 w-3 text-blue-500" />
                  ) : null}
                  {device.sensorType === "HUMIDITY" ||
                  device.sensorType === "BOTH" ? (
                    <Droplet className="h-3 w-3 text-teal-500" />
                  ) : null}
                  <span className="text-muted-foreground capitalize">
                    {device.sensorType === "BOTH"
                      ? "Temperature & Humidity"
                      : device.sensorType === "TEMP"
                      ? "Temperature"
                      : "Humidity"}
                  </span>
                </div>
              </div>

              {/* {device.lastReading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {device.lastReading.timestamp.toLocaleTimeString()}
                </div>
              )} */}
            </div>

            {/* {device.lastReading && (
              <div className="mt-3 p-2 bg-muted/50 rounded-md">
                <div className="flex items-center gap-4 text-sm">
                  {device.lastReading.temperature !== undefined && (
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3 text-blue-500" />
                      <span className="font-medium">
                        {device.lastReading.temperature}°C
                      </span>
                    </div>
                  )}
                  {device.lastReading.humidity !== undefined && (
                    <div className="flex items-center gap-1">
                      <Droplet className="h-3 w-3 text-teal-500" />
                      <span className="font-medium">
                        {device.lastReading.humidity}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )} */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
