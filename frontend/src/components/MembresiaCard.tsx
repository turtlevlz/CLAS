
import React from 'react';

interface Feature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  tier: number | string;
  price: number | string;
  description: string;
  features: Feature[];
  color: string;
  isVisible: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, price, description, features, color, isVisible }) => {
  return (
    <div className={`bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className={`${color} text-white px-8 py-2 rounded-br-3xl self-start -ml-8 -mt-4 mb-6 font-bold text-xl shadow-lg`}>
        {tier}
      </div>
      <div className="text-5xl font-bold mb-2">${price}</div>
      <div className="text-gray-400 mb-6">/ por mes</div>
      <p className="text-center text-sm text-gray-600 mb-8 px-4">
        {description}
      </p>
      <ul className="space-y-4 w-full">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
            {f.included ? (
              <span className="text-green-500 bg-green-100 rounded-full p-1 text-xs">✔</span>
            ) : (
              <span className="text-gray-300 bg-gray-100 rounded-full p-1 text-xs">✖</span>
            )}
            <span className={f.included ? "" : "text-gray-300"}>{f.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;