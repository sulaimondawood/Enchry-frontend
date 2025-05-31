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
