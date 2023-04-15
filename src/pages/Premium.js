import React from 'react'
import PremiumFunction from "../components/PremiumDetails/PremiumFunction.js";
import PremiumDetails from "../components/PremiumDetails";
import PlanSelection from "../components/PremiumDetails/PlanSelection.js";
const Premium = () => {
  return (
    <div className={`text-white`}>
      <PremiumDetails />
      {/* <div className={`row`}>
        <div className={`col`}>
          <PremiumFunction />
        </div>
        <div className={`col`}>
          <PlanSelection />
        </div>
      </div> */}
    </div>
  );
};

export default Premium