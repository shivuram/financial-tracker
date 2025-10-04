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
            <NavLink to="/transactions">Financial Tracker Application</NavLink>
          </li>
          <li>
            <NavLink to="/job-portal">Job Portal Application</NavLink>
          </li>
          <li>
            <NavLink to="/multi-step-form">Multi Step Form Application</NavLink>
          </li>
          <li>
            <NavLink to="/pagination">Pagination</NavLink>
          </li>
          <li>
            <NavLink to="/autocomplete-search">AutoComplete Search Bar</NavLink>
          </li>
           <li>
            <NavLink to="/shopping-cart">Shopping Cart</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
