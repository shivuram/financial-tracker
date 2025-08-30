import "./App.css";
import Transactions from "./pages/Transactions/Transactions";
import JobPortal from "./pages/Job-Portal/Job-Portal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddJobs from "./pages/Job-Portal/add-jobs";

function App() {
  return (
    <>
      {/* <Transactions /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/job-portal" element={<JobPortal />} />
          <Route path="/job-portal/add-jobs" element={<AddJobs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
