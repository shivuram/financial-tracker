// JobPortalLayout.tsx
import { Outlet } from "react-router-dom";
import { JobsProvider } from "../../contexts/JobsContext";

const JobPortalLayout = () => {
  return (
    <JobsProvider>
      {/* Outlet will render nested job portal routes */}
      <Outlet />
    </JobsProvider>
  );
};

export default JobPortalLayout;
