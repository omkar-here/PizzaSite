import React, { useEffect, useState } from "react";
import { initTE } from "tw-elements";
import UpArrow from "../assets/UpArrow.png"
import "font-awesome/css/font-awesome.min.css";
import "tailwindcss/tailwind.css"; // Assuming you have the tailwind CSS setup already

initTE(); // Initialize tw-elements

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      data-te-ripple-init
      data-te-ripple-color="light"
      className={`fixed bottom-5 right-5 ${
        showButton ? "block" : "hidden"
      } rounded-full bg-red-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg`}
      onClick={backToTop}
    >
      <img src={UpArrow} width={20} />
    </button>
  );
};

export default ScrollToTopButton;
