import "./App.css";
import Transactions from "./pages/Transactions/Transactions";
import JobPortal from "./pages/Job-Portal/Job-Portal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddJobs from "./pages/Job-Portal/Add-jobs";
import JobPortalLayout from "./pages/Job-Portal/JobPortalLayout";
import MultiStepForm from "./pages/Multi-Step-Form/Mult-Step-Form";

function App() {
  return (
    <>
      {/* <Transactions /> */}
      <BrowserRouter>
        <Routes>
          {/* Non-job-portal routes */}
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />

          {/* Job portal routes with context provider */}
          <Route path="/job-portal" element={<JobPortalLayout />}>
            <Route index element={<JobPortal />} />
            <Route path="add-jobs" element={<AddJobs />} />
          </Route>

          <Route path="/multi-step-form" element={<MultiStepForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
