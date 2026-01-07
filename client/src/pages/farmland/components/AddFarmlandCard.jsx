import React from "react";
import { PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AddFarmlandCard = () => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/farmer/farmland/add")}
      className="group relative flex h-full min-h-85 w-full max-w-sm cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#2E7D32]/30 bg-gray-50/50 transition-all duration-300 hover:border-[#2E7D32] hover:bg-[#2E7D32]/5 hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#2E7D32_1px,transparent_1px)] bg-size-[16px_16px] opacity-[0.1]"></div>

      <div className="relative z-10 flex flex-col items-center p-6 text-center transition-transform duration-300 group-hover:scale-105">
        <div className="mb-4 rounded-full bg-white p-4 shadow-sm ring-1 ring-[#2E7D32]/20 transition-all duration-300 group-hover:bg-[#2E7D32] group-hover:shadow-md">
          <PlusCircle className="h-10 w-10 text-[#2E7D32] transition-colors duration-300 group-hover:text-white" />
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-700 group-hover:text-[#2E7D32]">
          Register New Land
        </h3>

        <p className="max-w-50 text-sm text-gray-500 font-['Poppins']">
          Add details for a new plot to get AI-driven crop suggestions.
        </p>
      </div>
    </Card>
  );
};

export default AddFarmlandCard;
