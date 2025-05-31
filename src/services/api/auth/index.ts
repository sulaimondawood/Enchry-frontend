import { api } from "..";

export interface RegisterPayload {
  email: string;
  password: string;
  fullname: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const Register = async (payload: RegisterPayload) => {
  try {
    const res = await api.post("/auth/register", payload);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
export const SignIn = async (payload: LoginPayload) => {
  try {
    const res = await api.post("/auth/login", payload);
    console.log(res);

    return res.data;
  } catch (error: any) {
    throw error;
  }
};
