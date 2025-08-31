import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JobsContext } from "../../contexts/JobsContext";
import "../../styles/job-list.css";

const JobPortal = () => {
  const navigate = useNavigate();
  const { jobs, isLoading, error, totalCount } = useContext(JobsContext);

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

        {error && <div>Something went wrong</div>}

        {!isLoading && jobs.length === 0 && <p>No Jobs Found</p>}

        <div className="job-container">
          {jobs.map((job) => (
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
