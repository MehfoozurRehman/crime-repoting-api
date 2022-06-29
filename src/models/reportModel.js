const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    user: Array,
    officerName: {
      type: String,
      default: "not assigned",
    },
    officerEmail: {
      type: String,
      default: "not assigned",
    },
    officerPhone: {
      type: String,
      default: "not assigned",
    },
    status: String,
    location: String,
    crimeType: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reports", reportSchema);
