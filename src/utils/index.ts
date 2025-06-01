import { toast } from "sonner";

export const getDeviceGeoPoints = (
  callback: (coords: { lat: number; long: number }) => void
) => {
  const location = navigator?.geolocation;

  if (!location) {
    const msg = "Geolocation is not supported by this browser.";
    toast.error(msg);
    console.error(msg);
    callback({ lat: 0, long: 0 });
    return;
  }

  location.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      toast.success("Device location scanned and retrieved!");
      callback({ lat, long });
    },
    (error) => {
      switch (error.code) {
        case 1:
          toast.error("User denied the request for Geolocation.");
          break;
        case 2:
          toast.error("Location information is unavailable.");
          break;
        case 3:
          toast.error("Location request timed out.");
          break;
        default:
          toast.error("An unknown error occurred.");
      }
      callback({ lat: 0, long: 0 });
    },
    {
      enableHighAccuracy: true,
    }
  );
};
