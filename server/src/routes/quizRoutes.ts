import { Router } from "express";
import { createQuiz, deleteQuize, getQuizes, updateQuiz } from "../controllers/quizControllers";


const router=Router();

router.post('/createQuiz',createQuiz)
router.get('/Quiz',getQuizes)
router.delete('/Quiz/:id', deleteQuize)
router.put('/Quiz/:id', updateQuiz)


export default router;

