import { useEffect, useState } from "react";
import type { Job } from "../../types/transaction";

const JobPortal = () => {
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
        <h2>Jobs (Total: {totalCount})</h2>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <ul>
            {jobs.map((job) => {
              return (
                <li key={job.id}>
                  {job.title} - {job.company}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default JobPortal;
