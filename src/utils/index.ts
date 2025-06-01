import { toast } from "sonner";

export const getDeviceGeoPoints = () => {
  const location = navigator?.geolocation;

  if (location) {
    location.watchPosition(
      (postion) => {
        const lat = postion.coords.latitude;
        const long = postion.coords.longitude;

        toast.success("Device location scanned and retrieved!");
        return { lat, long };
      },
      (error) => {
        if (error.code === 1) {
          toast.error("User denied the request for Geolocation.");
        } else if (error.code === 2) {
          toast.error("Location information is unavailable.");
        } else if (error.code === 3) {
          toast.error("Location request timed out.");
        } else {
          toast.error(error?.message);
        }
      },
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    toast.error("Geolocation is not supported by this browser.");
    console.error("Geolocation is not supported by this browser.");
  }
};
