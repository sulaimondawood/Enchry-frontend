"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DeviceCard, DeviceData } from "./_components/device-card";
import { DashboardPageHeader } from "@/components/global/dashboard-page-header";
import { DeviceDetailsDialog } from "./_components/details-dialog";

// Sample device data
const devicesData: DeviceData[] = [
  {
    id: "device-001",
    name: "Living Room Sensor",
    type: "both",
    location: "Living Room",
    status: "online",
    lastSeen: "Just now",
    temperature: 23.5,
    humidity: 55,
    batteryLevel: 87,
    encryptionStatus: "secured",
    firmwareVersion: "1.2.4",
    macAddress: "00:1A:2B:3C:4D:5E",
    ipAddress: "192.168.1.100",
  },
  {
    id: "device-002",
    name: "Kitchen Sensor",
    type: "both",
    location: "Kitchen",
    status: "online",
    lastSeen: "3 minutes ago",
    temperature: 24.8,
    humidity: 52,
    batteryLevel: 65,
    encryptionStatus: "secured",
    firmwareVersion: "1.2.4",
    macAddress: "00:1A:2B:3C:4D:5F",
    ipAddress: "192.168.1.101",
  },
  {
    id: "device-003",
    name: "Bedroom Sensor",
    type: "temperature",
    location: "Bedroom",
    status: "online",
    lastSeen: "5 minutes ago",
    temperature: 21.2,
    batteryLevel: 92,
    encryptionStatus: "secured",
    firmwareVersion: "1.2.4",
    macAddress: "00:1A:2B:3C:4D:60",
    ipAddress: "192.168.1.102",
  },
  {
    id: "device-004",
    name: "Bathroom Sensor",
    type: "humidity",
    location: "Bathroom",
    status: "offline",
    lastSeen: "3 hours ago",
    humidity: 78,
    batteryLevel: 23,
    encryptionStatus: "unknown",
    firmwareVersion: "1.1.8",
    macAddress: "00:1A:2B:3C:4D:61",
    ipAddress: "192.168.1.103",
  },
  {
    id: "device-005",
    name: "Basement Sensor",
    type: "both",
    location: "Basement",
    status: "online",
    lastSeen: "8 minutes ago",
    temperature: 19.8,
    humidity: 65,
    batteryLevel: 76,
    encryptionStatus: "secured",
    firmwareVersion: "1.2.4",
    macAddress: "00:1A:2B:3C:4D:62",
    ipAddress: "192.168.1.104",
  },
  {
    id: "device-006",
    name: "Garage Sensor",
    type: "temperature",
    location: "Garage",
    status: "warning",
    lastSeen: "15 minutes ago",
    temperature: 16.2,
    batteryLevel: 32,
    encryptionStatus: "vulnerable",
    firmwareVersion: "1.1.5",
    macAddress: "00:1A:2B:3C:4D:63",
    ipAddress: "192.168.1.105",
  },
];

const DevicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState<DeviceData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleDeviceDetails = (device: DeviceData) => {
    setSelectedDevice(device);
    setIsDetailsOpen(true);
  };

  const filteredDevices = devicesData.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || device.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddDevice = () => {
    toast({
      title: "Add Device",
      description: "Feature to add new devices will be available soon.",
    });
  };

  return (
    <div>
      <DashboardPageHeader
        title="Devices"
        description="Manage and monitor your secure IoT devices"
      />

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddDevice}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onEditClick={handleDeviceDetails}
            />
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/30">
            <h3 className="text-lg font-semibold mb-2">No devices found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              No devices match your current filter criteria. Try adjusting your
              search or filter settings.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <DeviceDetailsDialog
        device={selectedDevice}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  );
};

export default DevicesPage;
