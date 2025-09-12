import { useState } from "react";
import "../../styles/form.css";

type FormData = {
  name: string;
  email: string;
  jobTitle: string;
  location: string;
  salary: number | null;
};

const initialData = {
  name: "",
  email: "",
  jobTitle: "",
  location: "",
  salary: null,
};

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);

  const tabs = ["Personal Info", "Job Application", "Review"];

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    console.dir(formData);
  };

  return (
    <div className="form-container">
      <div className="tabs">
        {tabs.map((tab, index) => {
          return (
            <button
              key={index}
              className={`tab ${index === step ? "active" : ""}`}
              disabled={index !== step}
            >
              {tab}
            </button>
          );
        })}
      </div>
      {step === 0 && (
        <div>
          <h2>Personal Information</h2>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            className="text"
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="text"
          />
        </div>
      )}

      {step === 1 && (
        <div>
          <h2>Job Details</h2>
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={changeHandler}
            className="text"
          />
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary ?? ""} // show empty if null
            onChange={changeHandler}
            className="text"
          />
          <label>Location</label>
          <input
            type="string"
            name="location"
            value={formData.location}
            onChange={changeHandler}
            className="text"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Review Information</h2>
          <p>Name: Shiva</p>
          <p>Email: xyz@gmail.com</p>
          <p>Job Title: React Developer</p>
          <p>Salary: Rs. 14 LPA</p>
          <p>Location: Chennai</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="buttons">
        {step > 0 && (
          <button className="btn" onClick={() => setStep((step) => step - 1)}>
            Back
          </button>
        )}
        {step < tabs.length - 1 && (
          <button className="btn" onClick={() => setStep((step) => step + 1)}>
            Next
          </button>
        )}
        {step === tabs.length - 1 && (
          <button className="btn submit" onClick={submitHandler}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
