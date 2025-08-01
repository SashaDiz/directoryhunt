import React from "react";

// Import SVGs
import homeIcon from "../../assets/home.svg";
import slotsIcon from "../../assets/slots.svg";
import trophyIcon from "../../assets/trophy.svg";
import linkIcon from "../../assets/link.svg";
import clockIcon from "../../assets/clock.svg";
import megaIcon from "../../assets/mega.svg";
import badgeIcon from "../../assets/badge.svg";
import { Button } from "./button";

const icons = [
  homeIcon,
  slotsIcon,
  trophyIcon,
  linkIcon,
  clockIcon,
  megaIcon,
  badgeIcon,
];

function PricingCard({ plan }) {
  return (
    <div
      className={`flex-1 border rounded-lg p-6 flex flex-col items-start ${
        plan.highlight ? "border-black border-2" : "border-gray-200"
      }`}
    >
      <h2 className="font-medium text-lg mb-2">{plan.title}</h2>
      <div className="text-3xl font-semibold mb-4">
        {plan.price}
        {plan.periodLabel && (
          <span className="text-sm font-medium text-gray-600">
            {" "}
            {plan.periodLabel}
          </span>
        )}
      </div>
      <ul className="text-sm text-gray-700 mb-6 space-y-3 text-left flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <img src={icons[i]} alt="" className="w-4 h-4 inline" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        className="w-full mt-auto"
        variant={plan.highlight ? "primary" : "default"}
      >
        {plan.button}
      </Button>
    </div>
  );
}

export default PricingCard;
