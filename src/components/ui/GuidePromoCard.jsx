import React from "react";
import PromoButton from "./PromoButton";

const GuidePromoCard = ({
  imageSrc,
  name,
  subtitle,
  title,
  description,
  buttonText,
  buttonLink,
}) => (
  <div className="rounded-2xl border border-gray-200 p-6 max-w-xl bg-white">
    <div className="flex items-center mb-4">
      <img src={imageSrc} alt={name} className="w-16 h-16 object-cover mr-4" />
      <div>
        <div className="font-medium text-lg leading-none mb-1">{name}</div>
        <div className="text-gray-700 text-sm">{subtitle}</div>
      </div>
    </div>
    <div className="mb-4">
      <div className="font-medium text-lg leading-6 mb-2">{title}</div>
      <div className="text-black text-sm">{description}</div>
    </div>
    <PromoButton href={buttonLink}>{buttonText}</PromoButton>
  </div>
);

export default GuidePromoCard;
