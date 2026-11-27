import { useState } from "react";
import SkillsSection from "../../components/SkillSection/SkillsSection";
import "../../styles/form.css";

export type employeeDataType = {
  name: string;
  email: string;
  age: number;
  employmentType: string;
  department: string;
  salary: number;
  duration: number;
  rate: number;
  skills: string[];
};

function DynamicEmployeeRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [employmentType, setEmploymentType] = useState("Permanent");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [duration, setDuration] = useState("");
  const [rate, setRate] = useState("");
  const [employeeData, setEmployeeData] = useState<employeeDataType>({});
  const [skills, setSkills] = useState(["React"]);
  const [isSuccess, setIsSuccess] = useState(false);
  //const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // if (name.length < 3) {
    //   console.log(name.length);
    //   setErrorMessage("Minimum 3 Characters required");
    //   return;
    // } else if (emailRegex.test(email)) {
    //   setErrorMessage("Invalid Email Format");
    // }
    setEmployeeData({
      name,
      email,
      age,
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
          required
        />
        <br />
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Age</label>
        <input
          id="age"
          name="age"
          type="number"
          className="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
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
              required
            />
            <label>Annual Salary</label>
            <input
              id="salary"
              name="salary"
              type="number"
              className="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
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
            <label>Hourly Rate</label>
            <input
              id="rate"
              name="rate"
              type="number"
              className="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
        )}

        <SkillsSection skills={skills} setSkills={setSkills} />

        <button type="submit">Submit</button>
      </form>
      {isSuccess && (
        <>
          <h2>Employee Data Submitted successfully</h2>
          {employeeData && <p>{employeeData.name}</p>}
        </>
      )}
    </div>
  );
}

export default DynamicEmployeeRegistration;
