import React from "react";

const InfoCard = ({ tag, description, value }) => {
  if (value === null) {
    throw new Error("Value can't be null");
  }

  let valueTag = "mt-4 amount";

  if (value > 0) {
    valueTag += " positive";
  } else {
    valueTag += " negative";
  }

  if (tag === "TotalExpenses") {
    valueTag += " negative";
  }

  return (
    <div className="card" id={`dashboard-${tag}Div`}>
      <p id={`${tag}Value`} className={valueTag}>
        {`${value}€`}
      </p>
      <p className="description">{description}</p>
    </div>
  );
};

export default InfoCard;
