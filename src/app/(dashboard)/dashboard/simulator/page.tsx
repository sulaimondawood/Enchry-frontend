"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Thermometer, Droplet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardPageHeader } from "@/components/global/dashboard-page-header";
import { DeviceSimulator } from "./_components/DeviceSimulator";
import { RegisteredDevicesList } from "./_components/RegisteredDevicesList";
import { DeviceRegistrationDialog } from "./_components/DeviceRegistrationDialog";
import useDetectInternetConnection from "@/hooks/use-detect-internet-connection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface SimulatedDevice {
  id: string;
  name: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  type: "temperature" | "humidity" | "both";
  status: "active" | "inactive";
  lastReading?: {
    temperature?: number;
    humidity?: number;
    timestamp: Date;
  };
}

const DeviceSimulatorPage = () => {
  const [devices, setDevices] = useState<SimulatedDevice[]>([
    {
      id: "sim-001",
      name: "London Office Sensor",
      location: "London, UK",
      latitude: 51.5074,
      longitude: -0.1278,
      type: "both",
      status: "active",
    },
    {
      id: "sim-002",
      name: "NYC Branch Sensor",
      location: "New York, USA",
      latitude: 40.7128,
      longitude: -74.006,
      type: "temperature",
      status: "inactive",
    },
  ]);

  const [selectedDevice, setSelectedDevice] = useState<SimulatedDevice | null>(
    null
  );
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const { toast } = useToast();
  const { isOnline } = useDetectInternetConnection();

  const handleRegisterDevice = (
    deviceData: Omit<SimulatedDevice, "id" | "status">
  ) => {
    const newDevice: SimulatedDevice = {
      ...deviceData,
      id: `sim-${Date.now()}`,
      status: "inactive",
    };

    setDevices((prev) => [...prev, newDevice]);
    toast({
      title: "Device Registered",
      description: `${deviceData.name} has been successfully registered.`,
    });
  };

  const handleDeviceUpdate = (updatedDevice: SimulatedDevice) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === updatedDevice.id ? updatedDevice : device
      )
    );
  };

  const handleDeleteDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId));
    if (selectedDevice?.id === deviceId) {
      setSelectedDevice(null);
    }
    toast({
      title: "Device Removed",
      description: "Device has been successfully removed from simulation.",
    });
  };

  const activeDevices = devices.filter((device) => device.status === "active");
  const totalReadings = devices.reduce(
    (sum, device) => sum + (device.lastReading ? 1 : 0),
    0
  );

  return (
    <div>
      <DashboardPageHeader
        title="IoT Device Simulator"
        description="Simulate temperature and humidity sensors using real-world weather data"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Devices
            </CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devices.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeDevices.length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Readings
            </CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReadings}</div>
            <p className="text-xs text-muted-foreground">Sensor data points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Device Connection Status
            </CardTitle>
            {isOnline ? (
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            ) : (
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            )}
          </CardHeader>
          <CardContent>
            {isOnline ? (
              <div className="text-2xl font-bold text-green-600">Online</div>
            ) : (
              <div className="text-2xl font-bold text-red-600">Offline</div>
            )}
            <p className="text-xs text-muted-foreground">Open-Meteo API</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.4fr] gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Device Simulation</h3>
            <Button onClick={() => setIsRegistrationOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Register Device
            </Button>
          </div>

          {selectedDevice ? (
            <DeviceSimulator
              device={selectedDevice}
              onDeviceUpdate={handleDeviceUpdate}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Select a Device</CardTitle>
                <CardDescription>
                  Choose a registered device from the list to start simulation
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Thermometer className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No device selected for simulation
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Registered Devices</h3>
          <RegisteredDevicesList
            devices={devices}
            selectedDevice={selectedDevice}
            onDeviceSelect={setSelectedDevice}
            onDeviceDelete={handleDeleteDevice}
          />
        </div>
      </div>

      <DeviceRegistrationDialog
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
        onRegister={handleRegisterDevice}
      />
    </div>
  );
};

export default DeviceSimulatorPage;
