import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FindSitter from "./pages/FindSitter";
import BecomeSitter from "./pages/BecomeSitter";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import CreateCareRequest from "./pages/CreateCareRequest";
import CareRequests from "./pages/CareRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-sitter" element={<FindSitter />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/become-sitter" element={<BecomeSitter />} />
            <Route
              path="/create-care-request"
              element={<CreateCareRequest />}
            />
          </Route>
          <Route path="/care-requests" element={<CareRequests />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
