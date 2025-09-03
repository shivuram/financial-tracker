import { useNavigate } from "react-router-dom";
import type { Job } from "../../types/transaction";
import { useContext, useState } from "react";
import { JobsContext } from "../../contexts/JobsContext";

const initialState = {
  title: "",
  location: "",
  company: "",
  salary: "",
};

const AddJobs = () => {
  const navigate = useNavigate();
  const { addJob } = useContext(JobsContext);

  const [form, setForm] = useState(initialState);

  const addJobsHandler = async () => {
    const newJob: Job = {
      id: Date.now(),
      ...form,
      salary: form.salary ? Number(form.salary) : null,
    };
    addJob(newJob);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="tracker-container">
        <div className="add-jobs-header">
          <button onClick={() => navigate("/job-portal")}>Back</button>
        </div>
        <div className="form">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={changeHandler}
          />
          <label htmlFor="Title">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={changeHandler}
          />
          <label htmlFor="Title">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={changeHandler}
          />
          <label htmlFor="Title">Salary (LPA)</label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={changeHandler}
          />
          <button onClick={addJobsHandler}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddJobs;
