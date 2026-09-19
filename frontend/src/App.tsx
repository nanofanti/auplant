import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FindSitter from "./pages/FindSitter";
import BecomeSitter from "./pages/BecomeSitter";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/find-sitter" element={<FindSitter />} />
        <Route path="/become-sitter" element={<BecomeSitter />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
