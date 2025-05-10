import React from "react";
import { AlertCircle, ShieldCheck, Wifi, WifiOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export type DeviceType = "temperature" | "humidity" | "both" | "gateway";

export interface DeviceData {
  id: string;
  name: string;
  type: DeviceType;
  location: string;
  status: "online" | "offline" | "warning";
  lastSeen: string;
  temperature?: number;
  humidity?: number;
  batteryLevel: number;
  encryptionStatus: "secured" | "unknown" | "vulnerable";
  firmwareVersion?: string;
  macAddress?: string;
  ipAddress?: string;
}

interface DeviceCardProps {
  device: DeviceData;
  onEditClick?: (device: DeviceData) => void;
}

export function DeviceCard({ device, onEditClick }: DeviceCardProps) {
  const { toast } = useToast();

  const handleRestartClick = () => {
    toast({
      title: "Restart command sent",
      description: `Device ${device.name} will restart shortly.`,
    });
  };

  const handleResetClick = () => {
    toast({
      description: `Device ${device.name} has been reset.`,
      variant: "destructive",
    });
  };

  return (
    <Card
      className={
        device.status === "offline"
          ? "border-destructive/50"
          : device.status === "warning"
          ? "border-amber-300/50"
          : ""
      }
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            {device.name}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                device.status === "online"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : device.status === "warning"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {device.status}
            </span>
          </CardTitle>
          <CardDescription>
            {device.location} • {device.type}
          </CardDescription>
        </div>
        <div className="flex items-center">
          {device.status === "online" ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-600" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {device.temperature !== undefined && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Temperature
              </p>
              <p className="text-lg font-semibold">{device.temperature}°C</p>
            </div>
          )}
          {device.humidity !== undefined && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Humidity
              </p>
              <p className="text-lg font-semibold">{device.humidity}%</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Battery</p>
            <div className="flex items-center gap-2">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    device.batteryLevel > 70
                      ? "bg-green-600"
                      : device.batteryLevel > 30
                      ? "bg-amber-500"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${device.batteryLevel}%` }}
                />
              </div>
              <span className="text-xs font-medium">
                {device.batteryLevel}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Security
            </p>
            <div className="text-lg font-semibold flex items-center">
              {device.encryptionStatus === "secured" ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                      <span>Secured</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Using ChaCha-20 encryption</p>
                  </TooltipContent>
                </Tooltip>
              ) : device.encryptionStatus === "vulnerable" ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-red-600" />
                      <span>Vulnerable</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Security update required</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-amber-600" />
                      <span>Unknown</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Status can't be verified</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditClick && onEditClick(device)}
          >
            Details
          </Button>
          <Button variant="outline" size="sm" onClick={handleRestartClick}>
            Restart
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={handleResetClick}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
