import Announcement from "../models/AnnouncementMode";
import { NextFunction, Request, Response } from "express";

export const createAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, sender, dueDate } = req.body;
    if (!title || !description || !sender || !dueDate) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const announcement = await Announcement.create({
      title,
      description,
      sender,
      dueDate,
    });
    res
      .status(201)
      .json({ message: "announcement created successfully", announcement });
  } catch (err: any) {
    next(err);
  }
};

export const getAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gannouncement = await Announcement.find();
    res.status(201).json(gannouncement);
  } catch (err: any) {
    next(err);
  }
};

export const delAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const delnnouncement = await Announcement.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "announcement deleted successfully", delnnouncement });
  } catch (err: any) {
    next(err);
  }
};

export const updateAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, sender, dueDate } = req.body;

    const updatelnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, description, sender, dueDate },
      { new: true, runValidators: true }
    );
    res.status(201).json({
      message: "announcement updated successfully",
      updatelnnouncement,
    });
  } catch (err: any) {
    next(err);
  }
};
