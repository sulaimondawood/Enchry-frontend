import { toast } from "sonner";
import sodium from "libsodium-wrappers";

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

export const generateDeviceKeyPairs = async (deviceId: string) => {
  try {
    // Ensure sodium is ready
    await sodium.ready;

    // Derive a 32-byte seed from the device ID and salt
    const seed = sodium.crypto_generichash(32, deviceId);

    // Generate deterministic keypair from the seed
    const keypair = sodium.crypto_kx_seed_keypair(seed);

    return {
      publicKey: keypair.publicKey,
      privateKey: keypair.privateKey,
    };
  } catch (error) {
    console.error("Error in generateDeviceKeyPairs:", error);
    throw new Error("Failed to generate key pairs");
  }
};

export const toSodiumByteArray = async (key: string) => {
  try {
    // Ensure sodium is ready
    await sodium.ready;

    // Convert to uint8Array
    const uint8Array = sodium.from_base64(key);

    console.log("Converted Uint8Array:", uint8Array);

    return uint8Array;
  } catch (error) {
    console.error("Error converting Base64 to Uint8Array:", error);
    throw error;
  }
};
