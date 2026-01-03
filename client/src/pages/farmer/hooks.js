import { useQuery } from "@tanstack/react-query";
import { getFarmerDashboard } from "./api";

export const useFarmerDashboard = () =>
  useQuery({
    queryKey: ["farmer-dashboard"],
    queryFn: getFarmerDashboard,
  });
