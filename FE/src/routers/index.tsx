import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoadingProgress from "@/components/common/LoadingProgress";
import Home from "@/pages/Home";
import IssueDetail from "@/pages/IssueDetail";
import IssueList from "@/pages/IssueList";
import IssueRegister from "@/pages/IssueRegister";
import Label from "@/pages/Label";
import Login from "@/pages/Login";
import Milestone from "@/pages/Milestone";
import NotFound from "@/pages/NotFound";
import ButtonTest from "@/test-pages/ButtonTest";
import DropdownTest from "@/test-pages/DropdownTest";
import ListLayoutTest from "@/test-pages/ListLayoutTest";

const LazyHome = lazy(() => import("@/pages/Home"));
const LazyIssueDetail = lazy(() => import("@/pages/IssueDetail"));
const LazyIssueList = lazy(() => import("@/pages/IssueList"));
const LazyIssueRegister = lazy(() => import("@/pages/IssueRegister"));
const LazyLabel = lazy(() => import("@/pages/Label"));
const LazyLogin = lazy(() => import("@/pages/Login"));
const LazyMilestone = lazy(() => import("@/pages/Milestone"));
const LazyNotFound = lazy(() => import("@/pages/NotFound"));

const LazyButtonTest = lazy(() => import("@/test-pages/ButtonTest"));
const LazyDropdownTest = lazy(() => import("@/test-pages/DropdownTest"));
const LazyListLayoutTest = lazy(() => import("@/test-pages/ListLayoutTest"));

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

        <Route path="/ButtonTest" element={<LazyButtonTest />} />
        <Route path="/DropdownTest" element={<LazyDropdownTest />} />
        <Route path="/ListLayoutTest" element={<LazyListLayoutTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
