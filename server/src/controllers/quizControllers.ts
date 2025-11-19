import { NextFunction, Request, Response } from "express";
import Quiz from "../models/quizModel";

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, subject, dueDate } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const quiz = await Quiz.create({ title, subject, dueDate });

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getQuizes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizes = await Quiz.find();
    res.status(201).json(quizes);
  } catch (err: any) {
    next(err);
  }
};

export const deleteQuize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const delQuiz = await Quiz.findByIdAndDelete(id);
    if (!delQuiz) {
      return res.status(404).json({ error: "quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err: any) {
    next(err);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, subject, dueDate } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, subject, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz updated successfully",
      quiz: updatedQuiz,
    });
  } catch (err: any) {
    next(err);
  }
};
