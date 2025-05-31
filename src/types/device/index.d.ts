interface IDevice {
  active: boolean;
  deviceDescription: string;
  deviceName: string;
  id: string;
  sensorType: string;
}

interface DevicePayload {
  deviceName: string;
  deviceDescription?: string;
  sensorType: string;
}
