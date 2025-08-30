import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Job } from "../../types/transaction";
import "../../styles/job-list.css";

const JobPortal = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/jobs?_page=1&_limit=10"
        );
        const data = await response.json();
        setJobs(data.data);
        setTotalCount(data.meta.totalCount);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (error) {
    return <div className="tracker-container">Something went wrong</div>;
  }

  return (
    <>
      <div className="tracker-container">
        <div className="header-container">
          <h2>Jobs (Total: {totalCount})</h2>
          <button
            className="toggle-form-button"
            onClick={() => navigate("/job-portal/add-jobs")}
          >
            Add Jobs
          </button>
        </div>

        <div>
          <input type="text" placeholder="Search..." className="search" />
        </div>

        {isLoading && <div>Loading...</div>}
        <div className="job-container">
          {!isLoading &&
            jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <h2 className="job-title">{job.title}</h2>
                <p className="job-company">{job.company}</p>
                <p className="job-location">{job.location}</p>
                <p className="job-salary">{job.salary}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default JobPortal;
