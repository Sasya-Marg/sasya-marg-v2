import { ApiError } from "./apiError.js";

export const validatePreHarvestDates = ({
  newSowingDate,
  newHarvestedDate,
  existingSowingDate,
  existingHarvestedDate,
}) => {

  const sowingDate =
    newSowingDate ?? existingSowingDate;

  const harvestedDate =
    newHarvestedDate ?? existingHarvestedDate;

  const today = new Date();
  today.setHours(0, 0, 0, 0);


  if (sowingDate) {
    const sow = new Date(sowingDate);
    sow.setHours(0, 0, 0, 0);

    if (sow < today) {
      throw new ApiError(
        400,
        "Sowing date cannot be in the past"
      );
    }
  }


  if (sowingDate && harvestedDate) {
    const sow = new Date(sowingDate);
    const harvest = new Date(harvestedDate);

    sow.setHours(0, 0, 0, 0);
    harvest.setHours(0, 0, 0, 0);

    if (harvest <= sow) {
      throw new ApiError(
        400,
        "Harvest date must be after sowing date"
      );
    }
  }

  
  return true;
};
