import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Job } from "../../types/transaction";

const AddJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const addJobsHandler = async () => {
    const newJob = {
      title: "React Engineer",
      location: "Chennai",
      company: "SCB",
      salary: "25 LPA",
    };
    await fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setJobs(data.data);
        setTotalCount(data.meta.totalCount);
      });
  };

  return (
    <>
      <div className="tracker-container">
        <div className="add-jobs-header">
          <button onClick={() => navigate("/job-portal")}>Back</button>
        </div>
        <div className="form">
          <label htmlFor="Title">Title</label>
          <input type="text" />
          <label htmlFor="Title">Company</label>
          <input type="text" />
          <label htmlFor="Title">Location</label>
          <input type="text" />
          <label htmlFor="Title">Salary (LPA)</label>
          <input type="number" />
          <button onClick={addJobsHandler}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddJobs;
