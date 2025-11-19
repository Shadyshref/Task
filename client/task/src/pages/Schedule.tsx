import React, { useEffect } from 'react';
import Layout from '../layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchQuizes } from '../store/quizReducer';

const Schedule: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { quizes, loading, error } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchQuizes());
  }, [dispatch]);

  return (
    <Layout>
      <div className="max-w-full mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-6">
            Schedule of Exams
          </h1>

          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && quizes.length === 0 && <p>No quizzes available.</p>}

          {!loading && quizes.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 table-auto">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="py-2 px-4 border text-left">Subject</th>
                    <th className="py-2 px-4 border text-left">Unit</th>
                    <th className="py-2 px-4 border text-left">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {quizes.map((quiz) => (
                    <tr key={quiz._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{quiz.subject}</td>
                      <td className="py-2 px-4 border font-semibold">{quiz.title}</td>
                      <td className="py-2 px-4 border">
                        {new Date(quiz.dueDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
