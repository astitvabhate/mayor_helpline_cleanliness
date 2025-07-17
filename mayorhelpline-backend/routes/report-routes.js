import express from 'express';
import multer from 'multer';
import reportController from '../controllers/report-controller.js'; // ✅ default import

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Access methods via reportController object
router.post("/", upload.single("image"), reportController.createReport);
router.get("/", reportController.getAllReports);
router.delete("/:id", reportController.deleteReport);
router.patch("/:id", reportController.updateReportStatus);

export default router;
