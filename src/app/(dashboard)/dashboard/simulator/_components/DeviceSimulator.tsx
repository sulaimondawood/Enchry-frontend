import React, { useState } from "react";
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
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWeatherData = async (): Promise<WeatherData> => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${device.latitude}&longitude=${device.longitude}&current=temperature_2m,relative_humidity_2m&timezone=auto`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      return {
        temperature: parseFloat(data.current.temperature_2m.toFixed(1)),
        humidity: parseFloat(data.current.relative_humidity_2m.toFixed(1)),
      };
    } catch (error) {
      console.error("Weather API Error:", error);
      throw new Error("Unable to connect to weather service");
    }
  };

  const simulateScanning = async () => {
    setIsScanning(true);
    setError(null);
    setScanProgress(0);

    try {
      // Simulate scanning process with progress
      const steps = 10;
      for (let i = 0; i <= steps; i++) {
        setScanProgress((i / steps) * 100);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Fetch real weather data
      const weatherData = await fetchWeatherData();

      // Update device with new reading
      const updatedDevice: SimulatedDevice = {
        ...device,
        status: "active",
        lastReading: {
          ...(device.type === "temperature" || device.type === "both"
            ? { temperature: weatherData.temperature }
            : {}),
          ...(device.type === "humidity" || device.type === "both"
            ? { humidity: weatherData.humidity }
            : {}),
          timestamp: new Date(),
        },
      };

      onDeviceUpdate(updatedDevice);

      toast({
        title: "Sensor Reading Complete",
        description: `Successfully captured data from ${device.location}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      toast({
        title: "Sensor Error",
        description: "Failed to capture sensor data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    setScanProgress(0);
    toast({
      title: "Scan Stopped",
      description: "Sensor scanning has been stopped",
    });
  };

  const toggleDeviceStatus = () => {
    const updatedDevice: SimulatedDevice = {
      ...device,
      status: device.status === "active" ? "inactive" : "active",
    };
    onDeviceUpdate(updatedDevice);
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
            onClick={simulateScanning}
            disabled={isScanning || device.status === "inactive"}
            className="flex-1"
          >
            {isScanning ? (
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

          {isScanning && (
            <Button onClick={stopScanning} variant="outline">
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          )}

          <Button onClick={toggleDeviceStatus} variant="outline">
            {device.status === "active" ? "Deactivate" : "Activate"}
          </Button>
        </div>

        {/* Scanning Progress */}
        {isScanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scanning sensors...</span>
              <span>{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

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
                {device.latitude.toFixed(4)}, {device.longitude.toFixed(4)}
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
