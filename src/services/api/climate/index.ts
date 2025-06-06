import { api } from "..";

export const getLatestClimateReading = async () => {
  try {
    const res = await api.get("/climate");
    const data = res.data;

    return data;
  } catch (error) {
    throw error;
  }
};
