import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
      index: true,
    },

    itemType: {
      type: String,
      enum: ["harvested", "pre_harvested"],
      required: true,
    },

    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemTypeModel",
    },
  },
  { timestamps: true }
);


wishListSchema.virtual("itemTypeModel").get(function () {
  return this.itemType === "harvested"
    ? "Product"
    : "PreHarvestListing";
});


wishListSchema.index(
  { buyer: 1, itemType: 1, item: 1 },
  { unique: true }
);

export const WishList = mongoose.model("WishList", wishListSchema);
