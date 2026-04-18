import React from "react";
import { weddingData } from "../weddingConfig";
import lehzatLog from "../assets/pictures/lehzatlog.png";

const FrameCard1 = ({
  customImage,
  width = "230px",
  height = "388px",
  logoHeight = "h-7",
  titleSize = "text-[9px]",
  dateSize = "text-[16px]",
}) => {
  return (
    <div className="flex-none snap-center">
      {/* Full Bleed Frame Container */}
      <div
        style={{ width, height }}
        className="relative overflow-hidden rounded-[6.71px]"
      >
        {/* Background Image */}
        <img
          src={customImage || weddingData.coupleImage}
          alt="Frame Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top/Bottom Legibility Overlays */}
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#2B514C] opacity-[70%] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#2B514C] opacity-[70%] to-transparent" />

        {/* Top Branding */}

        <div className="absolute top-4 left-0 right-0 flex items-center justify-center gap-1.5 px-4 animate-in fade-in slide-in-from-top-4 duration-700 ">
          <img
            src={lehzatLog}
            alt="LehzatLogo"
            className={`${logoHeight} drop-shadow-lg`}
          />
        </div>

        {/* Bottom Details */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center px-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p
            className={`text-white w-full ${titleSize} font-constantia font-bold italic uppercase tracking-[0.08em] mb-1 drop-shadow-lg`}
          >
            {weddingData.names} {weddingData.eventTitle}
          </p>
          <p
            className={`text-[#D4A373] ${dateSize} font-carattere italic drop-shadow-md leading-none`}
          >
            {weddingData.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrameCard1;
