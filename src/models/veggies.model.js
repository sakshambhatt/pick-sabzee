const mongoose = require("mongoose");
const { Schema } = mongoose;
const VeggieSchema = new Schema(
  {
    name: {
      type: String,
      required: "Every veggie must have a name",
      unique: true,
    },
    regionalNames: [String],
    description: {
      type: String,
      default: "I don't know much about this veggie at the moment",
    },
    goodImage: {
      type: String,
      required: "please give a good image for this veggie",
    },
    goodDescription: { type: String },
    badImage: { type: String },
    badDesription: { type: String },
    category: {
      type: String,
      enum: ["Green leafy", "Flower", "Fruit", "Stem", "Root"],
      required: "Every veggie must have a type",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Veggie = mongoose.model("Veggie", VeggieSchema);

module.exports = { Veggie };
