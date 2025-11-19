import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import quizRoutes from "./routes/quizRoutes";
import announcementRoutes from "./routes/announcementRoutes";
import { errorHandler } from "./Middlewares/ErrorMiddleware";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(errorHandler)

app.use('/api',quizRoutes)
app.use('/api',announcementRoutes)

export default app