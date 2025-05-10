import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceData } from "./device-card";

interface DeviceDetailsDialogProps {
  device: DeviceData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeviceDetailsDialog({
  device,
  open,
  onOpenChange,
}: DeviceDetailsDialogProps) {
  if (!device) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{device.name}</DialogTitle>
          <DialogDescription>
            {device.type} • {device.location}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Device ID
                  </p>
                  <p>{device.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Type
                  </p>
                  <p>{device.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <p>{device.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Seen
                  </p>
                  <p>{device.lastSeen}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Firmware
                  </p>
                  <p>{device.firmwareVersion || "Unknown"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Battery Level
                  </p>
                  <p>{device.batteryLevel}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    MAC Address
                  </p>
                  <p>{device.macAddress || "Unknown"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    IP Address
                  </p>
                  <p>{device.ipAddress || "Unknown"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Encryption Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Protocol
                    </p>
                    <p>ChaCha-20</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <p
                      className={`${
                        device.encryptionStatus === "secured"
                          ? "text-green-600"
                          : device.encryptionStatus === "vulnerable"
                          ? "text-red-600"
                          : "text-amber-600"
                      }`}
                    >
                      {device.encryptionStatus === "secured"
                        ? "Secured"
                        : device.encryptionStatus === "vulnerable"
                        ? "Vulnerable - Update Required"
                        : "Unknown"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Key Size
                    </p>
                    <p>256-bit</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Last Key Rotation
                    </p>
                    <p>
                      {device.status === "online" ? "24 hours ago" : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Security Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Automatic key rotation</span>
                    <span className="text-green-600">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Secure boot</span>
                    <span className="text-green-600">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Firmware verification</span>
                    <span className="text-green-600">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Intrusion detection</span>
                    <span
                      className={
                        device.status === "online"
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }
                    >
                      {device.status === "online" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event History</h3>
                <div className="space-y-3">
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Connection established
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Today, 14:32
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Device connected to network using secure channel
                    </p>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Key rotation</span>
                      <span className="text-sm text-muted-foreground">
                        Yesterday, 23:00
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Encryption key successfully rotated
                    </p>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Firmware update</span>
                      <span className="text-sm text-muted-foreground">
                        3 days ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Updated to firmware version{" "}
                      {device.firmwareVersion || "1.2.4"}
                    </p>
                  </div>
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Device added</span>
                      <span className="text-sm text-muted-foreground">
                        14 days ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Device was added to the network and configured
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Update Device</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
