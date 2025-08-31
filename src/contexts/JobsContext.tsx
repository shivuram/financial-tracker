import { createContext, useState, ReactNode } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Job } from "../types/transaction";
import { useEffect } from "react";

// context type

type JobsContextType = {
  jobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;
  //   fetchJobs: () => Promise<void>;
  fetchJobs: (page?: number, limit?: number, search?: string) => Promise<void>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  error: string | null;
  addJob: (job: Job) => void;
};

const JobsContext = createContext<JobsContextType>({
  jobs: [],
  setJobs: () => [],
  fetchJobs: async () => {},
  totalCount: 0,
  setTotalCount: () => {},
  isLoading: false,
  error: null,
  addJob: () => {},
});

const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const addJob = (job: Job) => {
    setJobs((prev) => [...prev, job]);
    setTotalCount((prev) => prev + 1);
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        setJobs,
        fetchJobs,
        totalCount,
        setTotalCount,
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
