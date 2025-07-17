import Report from "../models/report-model.js";
import fs from 'fs';

// CREATE REPORT
const createReport = async (req, res) => {
  try {

    const location = typeof req.body.location === 'string'
      ? JSON.parse(req.body.location)
      : req.body.location;

    const reportData = {
      description: req.body.description,
      location: location,
      status: req.body.status || "Pending"
    };

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      const base64Image = imageBuffer.toString('base64');

      reportData.image = {
        data: base64Image,
        contentType: req.file.mimetype
      };

      fs.unlinkSync(req.file.path);
    }

    const newReport = new Report(reportData);
    await newReport.save();

    res.status(201).json({ success: true, message: "Report saved successfully" });
  } catch (error) {
    console.error("❌ Error saving report:", error.message);
    res.status(500).json({ success: false, message: "Failed to save report" });
  }
};

// GET ALL REPORTS
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("❌ Error fetching reports:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch reports" });
  }
};

// DELETE REPORT
const deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReport = await Report.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting report:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete report" });
  }
};

// UPDATE REPORT STATUS
const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: "Error updating report", error: err });
  }
};

// ✅ Export all functions
export default {
  createReport,
  getAllReports,
  deleteReport,
  updateReportStatus,
};
