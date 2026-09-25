import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import ScrollToTopButton from "../ScrollToTopButton";

function MainLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default MainLayout;
