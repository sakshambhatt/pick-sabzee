const mongoose = require("mongoose");
const { allowedCategories } = require("../configs/config");
const { Schema } = mongoose;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      enum: allowedCategories,
      required: "Every veggie must have a type",
      unique: true,
    },
    description: {
      type: String,
      default: "I don't know much about these types of veggies at the moment",
    },
    bannerImage: {
      type: String,
      required:
        "Enter a URL of any veggie which can be categorized in this category",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
