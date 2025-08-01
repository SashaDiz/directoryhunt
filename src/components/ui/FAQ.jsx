import React from "react";

function FAQ({ faqs }) {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="border rounded-lg transition duration-300 hover:border-gray-900"
        >
          <button
            className="w-full cursor-pointer font-medium text-lg text-left px-6 py-5 flex justify-between items-center transition duration-300"
            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
          >
            <span>{faq.q}</span>
            <svg
              width="15"
              height="8"
              viewBox="0 0 15 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform delay-250 duration-400 ${
                openFaq === idx ? "rotate-180" : ""
              }`}
            >
              <path
                d="M12.6426 1.71456L7.49972 6.85742L2.35686 1.71456"
                stroke="black"
                strokeWidth="2.28571"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              openFaq === idx
                ? "max-h-96 opacity-100 delay-250"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-5 text-md text-gray-900">{faq.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
