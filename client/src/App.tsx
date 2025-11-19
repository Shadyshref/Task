import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import DashBoard from "./pages/DashBoard";
import Announcement from "./pages/Announcement";
import ExamsTips from "./pages/ExamsTips";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/examstipes" element={<ExamsTips />} />
        <Route path="/Announcement" element={<Announcement />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
