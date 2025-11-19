import { Router } from "express";
import {
  createAnnouncement,
  delAnnouncement,
  getAnnouncement,
  updateAnnouncement,
} from "../controllers/announcementCnotrollers";

const router = Router();

router.post("/createannouncement", createAnnouncement);
router.get("/getannouncement", getAnnouncement);
router.delete("/delannouncement/:id", delAnnouncement);
router.put("/updannouncement/:id", updateAnnouncement);

export default router;
