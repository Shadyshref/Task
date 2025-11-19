import React, { useEffect } from "react";
import Layout from "../layout/layout";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/index";
import { fetchAnnouncements } from "../store/announcementReducer";
import { Megaphone } from "lucide-react";

const Announcement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { announcements, loading } = useSelector(
    (state: RootState) => state.announcement
  );

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Announcements</h1>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="h-10 w-10 border-4 border-blue-500 rounded-full border-b-transparent animate-spin"></div>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {announcements.map((ann) => (
            <div
              key={ann._id}
              className="p-5 bg-white shadow-md rounded-xl border border-blue-100 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <Megaphone className="text-blue-700" size={28} />
                <h2 className="text-xl font-bold text-blue-900">{ann.title}</h2>
              </div>

              <p className="text-gray-700 mt-2">{ann.description}</p>

              <div className="flex justify-between mt-3 items-center">
                <p className="text-sm text-gray-500">
                  By <span className="font-semibold">{ann.sender}</span>
                </p>
                <p className="text-sm text-gray-400">
  {new Date(ann.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}
</p>

              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Announcement;