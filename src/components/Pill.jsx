import React from "react";

const Pill = ({ pill, removePillHandler }) => {
  return (
    <div className="user-pill">
      <img src={pill.image} alt={`${pill.firstName} ${pill.lastName}`} />
      <span>
        {pill.firstName} {pill.lastName}
      </span>
      <button onClick={() => removePillHandler(pill)}>&times;</button>
    </div>
  );
};

export default Pill;
