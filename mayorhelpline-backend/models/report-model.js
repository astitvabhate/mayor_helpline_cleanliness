import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String },
    mapUrl: { type: String }
  },
  image: {
    data: { type: String }, // base64 string
    contentType: { type: String }
  },
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" }
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

export default Report;
