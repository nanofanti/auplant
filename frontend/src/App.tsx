import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FindSitter from "./pages/FindSitter";
import BecomeSitter from "./pages/BecomeSitter";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import CreateCareRequest from "./pages/CreateCareRequest";
import CareRequests from "./pages/CareRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EditCareRequest from "./pages/EditCareRequest";
import EditSitterProfile from "./pages/EditSitterProfile";
import SignUp from "./pages/SignUp";
import { Toaster } from "sonner";

import "./App.css";
import Instructions from "./pages/Instructions";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-sitter" element={<FindSitter />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/become-sitter" element={<BecomeSitter />} />
            <Route
              path="/create-care-request"
              element={<CreateCareRequest />}
            />
            <Route
              path="/care-requests/:id/edit"
              element={<EditCareRequest />}
            />
            <Route
              path="/sitter-profile/edit"
              element={<EditSitterProfile />}
            />
          </Route>
          <Route path="/care-requests" element={<CareRequests />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
