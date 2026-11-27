import { useState } from "react";
import "../../styles/form.css";

const SkillsSection = ({ skills, setSkills, error }) => {
  const [skillsInput, setSkillsInput] = useState("");

  const addSkills = () => {
    setSkills([...skills, skillsInput]);
    setSkillsInput("");
  };

  const deleteSkills = (item) => {
    setSkills((prev) =>
      prev.filter((skill) => {
        return skill != item;
      }),
    );
  };

  return (
    <div className="list">
      <h4>Skills</h4>
      <input
        id="skills"
        name="skills"
        type="text"
        className="text"
        value={skillsInput}
        onChange={(e) => setSkillsInput(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="button" onClick={() => addSkills()}>
        Add Skills
      </button>
      {skills.map((tag) => (
        <div className="list-card">
          <p key={Math.random()}>{tag}</p>
          <button
            className="delete-button"
            type="button"
            onClick={() => deleteSkills(tag)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
