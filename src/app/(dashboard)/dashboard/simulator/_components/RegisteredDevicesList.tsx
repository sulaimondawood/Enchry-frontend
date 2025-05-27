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
  Clock,
} from "lucide-react";
import { SimulatedDevice } from "../page";

interface RegisteredDevicesListProps {
  devices: SimulatedDevice[];
  selectedDevice: SimulatedDevice | null;
  onDeviceSelect: (device: SimulatedDevice) => void;
  onDeviceDelete: (deviceId: string) => void;
}

export function RegisteredDevicesList({
  devices,
  selectedDevice,
  onDeviceSelect,
  onDeviceDelete,
}: RegisteredDevicesListProps) {
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
            Click "Register Device" to add a new sensor
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
            selectedDevice?.id === device.id
              ? "ring-2 ring-primary bg-accent/50"
              : "hover:bg-accent/30"
          }`}
          onClick={() => onDeviceSelect(device)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {device.status === "active" ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <CardTitle className="text-base">{device.name}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={device.status === "active" ? "default" : "secondary"}
                >
                  {device.status}
                </Badge>
                <Button
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
              {device.location}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  {device.type === "temperature" || device.type === "both" ? (
                    <Thermometer className="h-3 w-3 text-blue-500" />
                  ) : null}
                  {device.type === "humidity" || device.type === "both" ? (
                    <Droplet className="h-3 w-3 text-teal-500" />
                  ) : null}
                  <span className="text-muted-foreground capitalize">
                    {device.type === "both"
                      ? "Temperature & Humidity"
                      : device.type}
                  </span>
                </div>
              </div>

              {device.lastReading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {device.lastReading.timestamp.toLocaleTimeString()}
                </div>
              )}
            </div>

            {device.lastReading && (
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
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
