import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, Droplet } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addDevice } from "@/services/api/simulation";
import { queryClient } from "@/services/providers/tanstack-provider";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface DeviceRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeviceRegistrationDialog({
  open,
  onOpenChange,
}: DeviceRegistrationDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "" as "temperature" | "humidity" | "both" | "",
  });

  const { mutate: handleCreateDevice, isPending: isAddingDevice } = useMutation(
    {
      mutationFn: async (payload: DevicePayload) => await addDevice(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["devices", "all"],
        });
        toast.success("Device has been successfully added");
        // Reset form
        setFormData({
          name: "",
          type: "",
          description: "",
        });

        onOpenChange(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        if (error?.response?.data) {
          Object.entries(error?.response.data).forEach(([, message]) => {
            toast.error(String(message));
          });
        } else {
          toast.error(error.message || "Something went wrong");
        }
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleCreateDevice({
      deviceName: formData?.name,
      sensorType: formData.type,
      deviceDescription: formData?.description || "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register New IoT Device</DialogTitle>
          <DialogDescription>
            Add a new simulated temperature and humidity sensor to your network
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Device Name</Label>
            <Input
              id="name"
              placeholder="e.g., Office Sensor A1"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Device Description</Label>
            <Textarea
              id="d-desc"
              placeholder="e.g., Office Sensor A1 to detect temperature level"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-3">
            <Label>Sensor Type</Label>
            <div className="grid grid-cols-3 gap-3">
              <Card
                className={`cursor-pointer transition-all ${
                  formData.type === "temperature"
                    ? "ring-2 ring-primary bg-accent"
                    : "hover:bg-accent/50"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "temperature" }))
                }
              >
                <CardContent className="p-4 text-center">
                  <Thermometer className="mx-auto h-6 w-6 text-blue-500 mb-2" />
                  <p className="text-sm font-medium">Temperature</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  formData.type === "humidity"
                    ? "ring-2 ring-primary bg-accent"
                    : "hover:bg-accent/50"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "humidity" }))
                }
              >
                <CardContent className="p-4 text-center">
                  <Droplet className="mx-auto h-6 w-6 text-teal-500 mb-2" />
                  <p className="text-sm font-medium">Humidity</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  formData.type === "both"
                    ? "ring-2 ring-primary bg-accent"
                    : "hover:bg-accent/50"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "both" }))
                }
              >
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    <Thermometer className="h-5 w-5 text-blue-500" />
                    <Droplet className="h-5 w-5 text-teal-500" />
                  </div>
                  <p className="text-sm font-medium">Both</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isAddingDevice}>
              {isAddingDevice ? "Adding Device..." : "Register Device"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
