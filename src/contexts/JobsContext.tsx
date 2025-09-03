import { createContext, useState, ReactNode } from "react";
import type { Job } from "../types/transaction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// context type

type JobsContextType = {
  jobs: Job[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  addJob: (job: Job) => void;
};

const JobsContext = createContext<JobsContextType>({
  jobs: [],
  totalCount: 0,
  isLoading: false,
  error: null,
  addJob: () => {},
});

// export const JobsContext = createContext<JobsContextType | undefined>(
//   undefined
// );

const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchJobs = async (
    page: number = 1,
    limit: number = 10,
    search: string = ""
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      let url = `http://localhost:5000/jobs?_page=${page}&_limit=${limit}`;
      if (search) {
        url += `&title_like=${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      const total = res.headers.get("x-total-count");

      setJobs(data.data);
      setTotalCount(total ? Number(total) : data.length);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (newJob: Job) => {
    // Shall i post API call here instead of my route
    await fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setJobs((prev) => [...prev, newJob]); // Optimistic Update instead of refetch again
        setTotalCount((prev) => prev + 1);
        navigate("/job-portal");
      });
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        totalCount,
        isLoading,
        error,
        addJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext, JobsProvider };
