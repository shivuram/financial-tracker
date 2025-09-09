import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobsContext } from "../../contexts/JobsContext";
import "../../styles/job-list.css";

const JOBS_PER_PAGE = 10;

const JobPortal = () => {
  const navigate = useNavigate();
  const { jobs, isLoading, error, totalCount, page, setPage, setSearch } =
    useContext(JobsContext);
  const [searchText, setSearchText] = useState<string>("");

  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearch = () => {
    setSearchText("");
    if (setSearch) {
      setSearch(searchText);
    }
  };

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

        <div className="search-box">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="search"
          />
          <button disabled={searchText.trim() === ""} onClick={handleSearch}>
            Search
          </button>
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
              <p className="job-salary">{job.salary} LPA</p>
            </div>
          ))}
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <button onClick={handlePrev} disabled={page === 1}>
            Previous
          </button>
          <span style={{ margin: "0 12px" }}>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default JobPortal;
