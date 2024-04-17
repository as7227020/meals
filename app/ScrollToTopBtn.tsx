"use client";

import React, { useEffect, useState } from "react";
import "./ScrollToTopBtn.css";

export default function ScrollToTopBtn() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        // console.log(">100");
        setOpen(true);
      } else {
        //console.log("<100");
        setOpen(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {open && (
        <button className="scrolltotopbtn" onClick={scrollUp}>
          <div className="scrolltotopbtn-font">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="25 0 256 256"
            >
              <path
                fill="currentColor"
                d="M205.66 138.34A8 8 0 0 1 200 152h-64v72a8 8 0 0 1-16 0v-72H56a8 8 0 0 1-5.66-13.66l72-72a8 8 0 0 1 11.32 0ZM216 32H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16"
              />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
