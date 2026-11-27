import { useState, type FormEvent } from "react";
import SkillsSection from "../../components/SkillSection/SkillsSection";
import "../../styles/form.css";

export type employeeDataType = {
  name: string;
  email: string;
  age: number;
  employmentType: string;
  department: string | null;
  salary: string;
  duration: string;
  rate: string;
  skills: string[];
};

type FormErrors = {
  name?: string;
  email?: string;
  age?: string;
  department?: string;
  salary?: string;
  duration?: string;
  rate?: string;
  skills?: string;
};

function DynamicEmployeeRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | undefined>();
  const [employmentType, setEmploymentType] = useState("Permanent");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [duration, setDuration] = useState("");
  const [rate, setRate] = useState("");
  const [employeeData, setEmployeeData] = useState<employeeDataType>();
  const [skills, setSkills] = useState<string[]>(["React"]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nextErrors: FormErrors = {};

    if (name.trim().length < 3) {
      nextErrors.name = "Minimum 3 characters required";
    }

    if (!emailRegex.test(email)) {
      nextErrors.email = "Invalid Email Format";
    }

    if (age === undefined) {
      nextErrors.age = "Age is required";
    } else if (age < 18 || age > 60) {
      nextErrors.age = "Age should be between 18 and 60";
    }

    if (employmentType === "Permanent") {
      if (department.trim().length === 0) {
        nextErrors.department = "Department is required";
      }

      if (salary.trim().length === 0) {
        nextErrors.salary = "Salary is required";
      } else if (Number(salary) <= 0) {
        nextErrors.salary = "Salary must be greater than 0";
      }
    } else {
      if (duration.trim().length === 0) {
        nextErrors.duration = "Contract duration is required";
      } else if (Number(duration) <= 0) {
        nextErrors.duration = "Contract duration must be greater than 0";
      }

      if (rate.trim().length === 0) {
        nextErrors.rate = "Hourly rate is required";
      } else if (Number(rate) <= 0) {
        nextErrors.rate = "Hourly rate must be greater than 0";
      }
    }

    if (skills.length === 0) {
      nextErrors.skills = "At least one non-empty skilln required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      setIsSuccess(false);
      return;
    }

    setEmployeeData({
      name,
      email,
      age: age ?? 0,
      employmentType,
      department,
      salary,
      duration,
      rate,
      skills,
    });
    // After successful validation
    setIsSuccess(true);
  };
  return (
    <div className="form-container">
      <h2>Dynamic Employee Registration Form</h2>
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <br />
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <br />
        <label>Age</label>
        <input
          id="age"
          name="age"
          type="number"
          className="text"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        {errors.age && <p className="error">{errors.age}</p>}
        <br />
        <label>Employment Type</label>
        <select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
        >
          <option value="Permanent">Permanent</option>
          <option value="Contract">Contract</option>
        </select>
        {employmentType === "Permanent" ? (
          <div>
            <label>Department</label>
            <input
              id="department"
              name="department"
              type="text"
              className="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            {errors.department && <p className="error">{errors.department}</p>}
            <br />
            <label>Annual Salary</label>
            <input
              id="salary"
              name="salary"
              type="number"
              className="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            {errors.salary && <p className="error">{errors.salary}</p>}
            <br />
          </div>
        ) : (
          <div>
            <label>Contract Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              className="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            {errors.duration && <p className="error">{errors.duration}</p>}
            <br />
            <label>Hourly Rate</label>
            <input
              id="rate"
              name="rate"
              type="number"
              className="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            {errors.rate && <p className="error">{errors.rate}</p>}
            <br />
          </div>
        )}

        <SkillsSection
          skills={skills}
          setSkills={setSkills}
          error={errors.skills}
        />

        <button type="submit">Submit</button>
      </form>
      {isSuccess && (
        <>
          <h2>Employee Data Submitted successfully</h2>
          {employeeData && (
            <div>
              <p>{employeeData.name}</p>
              <p>{employeeData.age}</p>
              <p>{employeeData.employmentType}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DynamicEmployeeRegistration;
