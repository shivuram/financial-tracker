import "./App.css";
import Transactions from "./pages/Transactions/Transactions";
import JobPortal from "./pages/Job-Portal/Job-Portal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddJobs from "./pages/Job-Portal/Add-jobs";
import JobPortalLayout from "./pages/Job-Portal/JobPortalLayout";
import MultiStepForm from "./pages/Multi-Step-Form/Mult-Step-Form";
import Pagination from "./pages/Pagination/Pagination";
import AutoCompleteSearch from "./pages/AutoComplete-Search/AutoComplete-Search";
import ShoppingCartLayout from "./pages/Shopping-cart/Shopping-cart-layout";
// import Dummy from "./pages/Dummy/Dummy"; // Add the missing import
import Form from "./pages/Forms/Forms";
import Practicing from "./pages/Practicing/Practicing";
import DynamicEmployeeRegistration from "./pages/Forms/Dynamic-Employee-Registration";

function App() {
  return (
    <>
      {/* <Transactions /> */}
      <BrowserRouter>
        <Routes>
          {/* Non-job-portal routes */}
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />

          {/* Job portal routes with context provider */}
          <Route path="/job-portal" element={<JobPortalLayout />}>
            <Route index element={<JobPortal />} />
            <Route path="add-jobs" element={<AddJobs />} />
          </Route>

          <Route path="/multi-step-form" element={<MultiStepForm />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/autocomplete-search" element={<AutoCompleteSearch />} />

          <Route path="/shopping-cart" element={<ShoppingCartLayout />} />
          <Route path="/practicing" element={<Practicing />} />
          <Route path="/forms" element={<Form />} />
          <Route
            path="/employee-form"
            element={<DynamicEmployeeRegistration />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
