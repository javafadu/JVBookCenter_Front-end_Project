import React from "react";
import "./section-title.scss";
const SectionTitle = ({ title }) => {
  return (
    <div className="section-title">
      <span className="animate-character">{title}</span>
    </div>
  );
};

export default SectionTitle;
