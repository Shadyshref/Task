import mongoose from "mongoose";
interface Quiz {
  title: string;
  subject: string;
  dueDate: Date;
}

const quizSchema = new mongoose.Schema<Quiz>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Quiz>("Quiz",quizSchema)
