import { useState } from "react";
import "../../styles/form.css";

type FormData = {
  name: string;
  email: string;
  jobTitle: string;
  location: string;
  workPreference: string; // "remote" | "hybrid"
  salary: number | null;
};

const initialData = {
  name: "",
  email: "",
  jobTitle: "",
  location: "",
  workPreference: "hybrid", // ✅ default selected
  salary: null,
};

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tabs = ["Personal Info", "Job Application", "Review"];

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name) {
        newErrors.name = "Name is Required";
      }
      if (!formData.email) {
        newErrors.email = "Email is Required";
      }
    }

    if (step === 1) {
      if (!formData.jobTitle) {
        newErrors.jobTitle = "JobTitle is Required";
      }
      if (formData.salary === null) {
        newErrors.salary = "Salary is required";
      } else if (formData.salary <= 0) {
        newErrors.salary = "Salary must be greater than 0";
      }
      if (!formData.location) {
        newErrors.location = "Location is Required";
      }
    }

    setErrors(newErrors);

    console.log("newErrors", newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = () => {
    if (validateStep()) {
      console.log("✅ Final Data:", formData);
      alert("Form submitted! Check console.");
    }
    // console.dir(formData);
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((step) => step + 1);
    }
  };

  const prevStep = () => {
    setStep((step) => step - 1);
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
          {errors.name && <p className="error">{errors.name}</p>}
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="text"
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary ?? ""} // show empty if null
            onChange={changeHandler}
            className="text"
          />
          {errors.salary && <p className="error">{errors.salary}</p>}
          <div>
            <label>Preferred Job Location:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="workPreference"
                  value="remote"
                  checked={formData.workPreference === "remote"}
                  onChange={changeHandler}
                />
                Remote
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="workPreference"
                  value="hybrid"
                  checked={formData.workPreference === "hybrid"}
                  onChange={changeHandler}
                />
                Hybrid
              </label>
            </div>
            {errors.workPreference && (
              <p style={{ color: "red" }}>{errors.workPreference}</p>
            )}
          </div>

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={changeHandler}
            className="text"
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Review Information</h2>
          <p>
            <b>Name:</b> {formData.name}
          </p>
          <p>
            <b>Email:</b> {formData.email}
          </p>
          <p>
            <b>Job Title:</b> {formData.jobTitle}
          </p>
          <p>
            <b>Location:</b> {formData.location}
          </p>
          <p>
            <b>Salary:</b> {formData.salary ?? "Not provided"}
          </p>
          <p>
            <b>WorkPreference:</b> {formData.workPreference}
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="buttons">
        {step > 0 && (
          <button className="btn" onClick={prevStep}>
            Prev
          </button>
        )}
        {step < tabs.length - 1 && (
          <button className="btn" onClick={nextStep}>
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
