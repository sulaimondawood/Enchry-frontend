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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Thermometer, Droplet } from "lucide-react";
import { SimulatedDevice } from "../page";

interface DeviceRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (device: Omit<SimulatedDevice, "id" | "status">) => void;
}

const predefinedLocations = [
  { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
  { name: "New York, USA", latitude: 40.7128, longitude: -74.006 },
  { name: "Tokyo, Japan", latitude: 35.6762, longitude: 139.6503 },
  { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093 },
  { name: "Paris, France", latitude: 48.8566, longitude: 2.3522 },
  { name: "Berlin, Germany", latitude: 52.52, longitude: 13.405 },
  { name: "São Paulo, Brazil", latitude: -23.5558, longitude: -46.6396 },
  { name: "Dubai, UAE", latitude: 25.2048, longitude: 55.2708 },
];

export function DeviceRegistrationDialog({
  open,
  onOpenChange,
  onRegister,
}: DeviceRegistrationDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    type: "both" as "temperature" | "humidity" | "both",
  });

  const [useCustomLocation, setUseCustomLocation] = useState(false);

  const handleLocationSelect = (locationName: string) => {
    const location = predefinedLocations.find(
      (loc) => loc.name === locationName
    );
    if (location) {
      setFormData((prev) => ({
        ...prev,
        location: location.name,
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.location ||
      !formData.latitude ||
      !formData.longitude
    ) {
      return;
    }

    onRegister({
      name: formData.name,
      location: formData.location,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      type: formData.type,
    });

    // Reset form
    setFormData({
      name: "",
      location: "",
      latitude: "",
      longitude: "",
      type: "both",
    });
    setUseCustomLocation(false);
    onOpenChange(false);
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

          <div className="space-y-4">
            <Label>Location</Label>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={!useCustomLocation ? "default" : "outline"}
                onClick={() => setUseCustomLocation(false)}
                className="flex-1"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Predefined
              </Button>
              <Button
                type="button"
                variant={useCustomLocation ? "default" : "outline"}
                onClick={() => setUseCustomLocation(true)}
                className="flex-1"
              >
                Custom
              </Button>
            </div>

            {!useCustomLocation ? (
              <Select
                value={formData.location}
                onValueChange={handleLocationSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedLocations.map((location) => (
                    <SelectItem key={location.name} value={location.name}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Location name (e.g., San Francisco, USA)"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        latitude: e.target.value,
                      }))
                    }
                    required
                  />
                  <Input
                    placeholder="Longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        longitude: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
            )}
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
            <Button type="submit">Register Device</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
