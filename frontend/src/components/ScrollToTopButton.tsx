import { useEffect, useState } from "react";
import scrollToTopIcon from "../assets/scrolltotop-auplant.png";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-auplant-green text-white shadow-lg transition hover:-translate-y-1 hover:bg-auplant-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auplant-green"
    >
      <img
        src={scrollToTopIcon}
        alt=""
        className="h-14 w-14 object-contain"
        aria-hidden="true"
      />
    </button>
  );
}

export default ScrollToTopButton;
