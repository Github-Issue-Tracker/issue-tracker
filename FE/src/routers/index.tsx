import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LazyHome = lazy(() => import("@/pages/Home"));
const LazyIssueDetail = lazy(() => import("@/pages/IssueDetail"));
const LazyIssueList = lazy(() => import("@/pages/IssueList"));
const LazyIssueRegister = lazy(() => import("@/pages/IssueRegister"));
const LazyLabel = lazy(() => import("@/pages/Label"));
const LazyLogin = lazy(() => import("@/pages/Login"));
const LazyMilestone = lazy(() => import("@/pages/Milestone"));
const LazyNotFound = lazy(() => import("@/pages/NotFound"));

const Routers = ({ isOAuth }: { isOAuth: boolean }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={isOAuth ? <LazyHome /> : <LazyLogin />}>
          <Route index element={<LazyIssueList />} />
          <Route path="/issue-detail" element={<LazyIssueDetail />} />
          <Route path="/issue-register" element={<LazyIssueRegister />} />
          <Route path="/label" element={<LazyLabel />} />
          <Route path="/milestone" element={<LazyMilestone />} />
        </Route>
        <Route path="/login" element={<LazyLogin />} />
        <Route path="*" element={<LazyNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
