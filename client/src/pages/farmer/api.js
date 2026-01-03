import { api } from "@/lib/axios";

export const getFarmerDashboard = async () => {
  const { data } = await api.get("/farmer/dashboard");
  return data;
};
