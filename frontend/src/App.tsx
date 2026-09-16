import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FindSitter from "./pages/FindSitter";
import BecomeSitter from "./pages/BecomeSitter";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-sitter" element={<FindSitter />} />
        <Route path="/become-sitter" element={<BecomeSitter />} />
      </Routes>
    </>
  );
}

export default App;
