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
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteDevice, getDevice, getDevices } from "@/services/api/simulation";
import Skeleton from "react-loading-skeleton";
import { Loader } from "@/components/loader/Loader";
import { queryClient } from "@/services/providers/tanstack-provider";
import { useSearchParams } from "next/navigation";

const DeviceSimulatorPage = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const { toast } = useToast();
  const { isOnline } = useDetectInternetConnection();
  const searchParams = useSearchParams();

  console.log(searchParams.get("device"));

  // const handleDeviceUpdate = (updatedDevice: SimulatedDevice) => {
  //   setDevices((prev) =>
  //     prev.map((device) =>
  //       device.id === updatedDevice.id ? updatedDevice : device
  //     )
  //   );
  // };

  const { mutate: handleDeleteDevice, isPending: isDeletingDevice } =
    useMutation({
      mutationFn: async (deviceId: string) => await deleteDevice(deviceId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["devices", "all"],
        });

        toast({
          title: "Device Removed",
          description: "Device has been successfully removed from simulation.",
        });
      },
    });

  const {
    data: userDevices,
    isLoading,
    isError,
    refetch,
  } = useQuery<IDevice[]>({
    queryKey: ["devices", "all"],
    queryFn: getDevices,
  });

  const {
    data: device,
    isLoading: isLoadingDevice,
    isError: isErrorLoadingDevice,
  } = useQuery<IDevice>({
    queryKey: ["devices", "all", "single-device", searchParams?.get("device")],
    queryFn: () => getDevice(searchParams?.get("device") || ""),
    enabled: !!searchParams.get("device"),
  });

  const getActiveDevices = () => {
    if (userDevices) {
      const filteredDevice = userDevices.filter((device) => {
        if (device.active) return device.active;
      });

      return filteredDevice;
    }
    return [];
  };

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
            <div className="text-2xl font-bold">
              {userDevices?.length || <Skeleton />}
            </div>
            <p className="text-xs text-muted-foreground">
              {getActiveDevices().length} active
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
            <div className="text-2xl font-bold">{20}</div>
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

          {isLoadingDevice ? (
            <Loader />
          ) : searchParams.get("device") ? (
            <DeviceSimulator device={device!} />
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
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="text-center">
              <h1>Something went wrong</h1>
              <Button onClick={() => refetch()} variant={"outline"}>
                Try again
              </Button>
            </div>
          ) : (
            <RegisteredDevicesList
              devices={userDevices || []}
              onDeviceDelete={handleDeleteDevice}
              isDeleting={isDeletingDevice}
            />
          )}
        </div>
      </div>

      <DeviceRegistrationDialog
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
      />
    </div>
  );
};

export default DeviceSimulatorPage;
