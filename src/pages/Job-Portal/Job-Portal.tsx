import { useEffect, useState } from "react";
import type { Job } from "../../types/transaction";

const JobPortal = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/jobs?_page=1&_limit=10"
        );
        const data = await response.json();
        setJobs(data.data);
        setTotalCount(data.meta.totalCount);
      } catch {
        console.log("Catch Any error");
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <div className="tracker-container">
        <h2>Jobs (Total: {totalCount})</h2>
        <ul>
          {jobs.map((job) => {
            return (
              <li key={job.id}>
                {job.title} - {job.company}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default JobPortal;
