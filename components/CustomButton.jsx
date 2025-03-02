import React from "react";

const CustomButton = ({ text, href }) => {
  return (
    <a href={href} className="relative group inline-block p-px font-semibold leading-6 text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600">
      {/* Outer Glow Effect */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-green-500 to-lime-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Button Content */}
      <span className="relative z-10 block px-6 py-3 rounded-2xl bg-neutral-950">
        <div className="relative z-10 flex items-center space-x-3">
          {/* Text with Glow Effect */}
          <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_10px_#34d399]">
            {text}
          </span>
          
          {/* Arrow Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_10px_#34d399]">
            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
          </svg>
        </div>
      </span>
    </a>
  );
};

export default CustomButton;
