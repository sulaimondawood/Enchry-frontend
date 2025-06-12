import { api } from "..";

export const getDevices = async () => {
  try {
    const res = await api.get("/devices/user");
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const getDevice = async (deviceId: string) => {
  try {
    const res = await api.get("/devices/user/" + deviceId);
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const addDevice = async (payload: DevicePayload) => {
  try {
    const res = await api.post("/devices", payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDevice = async (deviceId: string) => {
  try {
    const res = await api.delete("/devices/" + deviceId);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const toggleDeviceStatus = async (
  deviceId: string,
  param: boolean,
  devicePublicKey: string
) => {
  try {
    const res = await api.patch(
      `/devices/${deviceId}/status?activate=${param}?key=${devicePublicKey}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
