import { api } from "..";

export interface RegisterPayload {
  email: string;
  password: string;
  fullname: string;
}

export const Register = async (payload: RegisterPayload) => {
  try {
    const res = await api.post("/auth/register", payload);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
