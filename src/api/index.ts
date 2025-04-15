import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getUser = async (email: string) => {
  const { data } = await api.get(`/users/validate-email`, {
    params: {
      email
    }
  })

  return data;
};
