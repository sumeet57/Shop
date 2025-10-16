import React, { useContext } from "react";
import { PortfolioContext } from "../../../Context/Portfolio.context";
import { useNavigate } from "react-router-dom";

const Button = ({ text, link, nav }) => {
  const navigate = useNavigate();
  const { setCursor } = useContext(PortfolioContext);

  // If a link isn't provided, the button won't link anywhere
  const anchorProps = nav
    ? { onClick: () => navigate(nav) }
    : link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      className="relative inline-flex items-center justify-center group"
      onMouseEnter={() => setCursor(true, 1.5)}
      onMouseLeave={() => setCursor(false, 1)}
    >
      {/* This div creates the blurred gradient glow effect */}
      <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>

      {/* This is the actual button/link */}
      <a
        role="button"
        className="group relative inline-flex items-center justify-center text-sm-button sm:text-lg-button lg:text-xl-button xl:text-2xl-button  rounded-xl bg-text-highlight/70 px-4 py-1 font-semibold text-white transition-all duration-200 hover:bg-text-highlight/85 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
        title={text}
        {...anchorProps}
      >
        {text}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 10"
          height="10"
          width="10"
          fill="none"
          className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
        >
          <path
            d="M0 5h7"
            className="transition opacity-0 group-hover:opacity-100"
          ></path>
          <path
            d="M1 1l4 4-4 4"
            className="transition group-hover:translate-x-[3px]"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default Button;
