import { useNavigate } from "react-router-dom";
import type { Job } from "../../types/transaction";
import { useContext } from "react";
import { JobsContext } from "../../contexts/JobsContext";

const AddJobs = () => {
  const navigate = useNavigate();
  const { addJob } = useContext(JobsContext);

  const addJobsHandler = async () => {
    const newJob: Job = {
      id: Date.now(),
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
      .then(() => {
        addJob(newJob); // Optimistic Update instead of refetch again
        navigate("/job-portal");
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
