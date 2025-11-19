import React, { useEffect, useMemo, useState } from "react";
import Layout from "../layout/layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/index";
import { fetchAnnouncements } from "../store/announcementReducer";
import { fetchQuizes } from "../store/quizReducer";
import { User, Clock } from "lucide-react";
import { Button } from "@mui/material";

const formatTime = (ms: number) => {
  const totalMinutes = Math.floor(ms / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return `${days}d ${hours}h ${minutes}m`;
};

const DashBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { announcements, loading: annLoading } = useSelector(
    (state: RootState) => state.announcement
  );
  const { quizes, loading: quizLoading } = useSelector(
    (state: RootState) => state.quiz
  );

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(fetchAnnouncements());
    dispatch(fetchQuizes());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const announcementsList = useMemo(() => {
    return announcements.map((ann) => (
      <div
        key={ann._id}
        className="flex flex-col bg-gray-100 p-4 rounded-xl shadow-sm gap-2"
      >
        <div className="flex items-start gap-3">
          <div className="bg-blue-200 p-2 rounded-full flex-shrink-0">
            <User size={30} className="text-blue-700" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">{ann.sender}</p>
            <p className="text-lg font-bold mt-1">{ann.title}</p>
          </div>
        </div>
        <p className="text-gray-700 mt-2">{ann.description}</p>
      </div>
    ));
  }, [announcements]);

  const quizesList = useMemo(() => {
    return quizes.map((quiz) => {
      const startDate = new Date(quiz.startDate);
      const dueDate = new Date(quiz.dueDate);
      const now = currentTime;

      let timeLeftText = "";
      let buttonDisabled = false;

      if (now < startDate) {
        const diffMs = startDate.getTime() - now.getTime();
        timeLeftText = `Starts in ${formatTime(diffMs)}`;
        buttonDisabled = true;
      } else if (now >= startDate && now <= dueDate) {
        const diffMs = dueDate.getTime() - now.getTime();
        timeLeftText = `Ends in ${formatTime(diffMs)}`;
        buttonDisabled = false;
      } else {
        const diffMs = now.getTime() - dueDate.getTime();
        timeLeftText = `Ended ${formatTime(diffMs)}`;
        buttonDisabled = true;
      }

      return (
        <div
          key={quiz._id}
          className="flex flex-col bg-gray-100 p-3 rounded-xl shadow-sm gap-2"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-500 font-semibold">
              {quiz.subject}
            </p>
            <p className="font-semibold text-blue-900">{quiz.title}</p>
            <p className="text-gray-600 text-sm">
              {new Date(quiz.dueDate).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-600 text-sm mt-1">{timeLeftText}</p>

          <Button
            variant="contained"
            color="primary"
            className="mt-2 normal-case"
            disabled={buttonDisabled}
          >
            Start Quiz
          </Button>
        </div>
      );
    });
  }, [quizes, currentTime]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 bg-white rounded-2xl p-4 md:p-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900">
            EXAMS TIME
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            Here we are, Are you ready for fight? Don't worry, we prepared some
            tips to <br className="hidden sm:inline" /> be ready for your exams
          </p>
          <Link to="/examstipes" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1e3a8a",
                color: "#ffffff",
                mt: 4,
                px: 4,
                py: 1.5,
                borderRadius: "0.375rem",
                "&:hover": {
                  backgroundColor: "#1b2d6b",
                },
                cursor: "pointer",
                textTransform: "none",
              }}
            >
              View exams tips
            </Button>
          </Link>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <img
            className="w-full max-w-[400px] h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] rounded object-cover opacity-80"
            src="/images/examScreen.jpg"
            alt="Exam Screen"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-full md:max-w-[1200px] mx-auto my-6 gap-6 md:gap-8">
        <div className="flex-[2.5] p-4 md:p-6 bg-white rounded-xl h-auto">
          <h2 className="font-bold text-2xl mb-4">Announcements</h2>
          {annLoading ? (
            <div className="flex justify-center items-center py-5">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-900 border-t-transparent"></div>
            </div>
          ) : announcements.length > 0 ? (
            <div className="flex flex-col gap-4">{announcementsList}</div>
          ) : (
            <p className="text-gray-500">No announcements available.</p>
          )}
        </div>

        <div className="flex-1 p-4 md:p-6 bg-white h-auto rounded-xl">
          <h2 className="font-bold text-2xl mb-4">Quizzes</h2>
          {quizLoading ? (
            <div className="flex justify-center items-center py-5">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-900 border-t-transparent"></div>
            </div>
          ) : quizes.length > 0 ? (
            <div className="flex flex-col gap-4">{quizesList}</div>
          ) : (
            <p className="text-gray-500">No quizzes available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
