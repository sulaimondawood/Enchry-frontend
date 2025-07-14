import { api } from "..";

export const getLatestClimateReading = async () => {
  try {
    const res = await api.get("/climate/latest");
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};
export const getSystemKey = async () => {
  try {
    const res = await api.get("/devices/key");
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};
