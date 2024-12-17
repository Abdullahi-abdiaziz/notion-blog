import React from "react";

const Pattern: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative ">
      <div className="absolute inset-0 bg-custom-svg bg-cover  opacity-40"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Pattern;
