import { NavLink } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/transactions">Financial Tracker</NavLink>
          </li>
          <li>
            <NavLink to="/job-portal">Job Portal</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
