import React from "react";
import { weddingData } from "../weddingConfig";

import Logo from "../assets/pictures/Logo.png";
const FrameCard2 = ({
  customImage,
  width = "230px",
  height = "388px",
  textLogoHeight = "h-3.5",
  titleSize = "text-[10px]",
  dateSize = "text-[25px]",
}) => {
  return (
    <div className="flex-none snap-center">
      {/* Clean Styled Frame Container */}
      <div
        style={{ width, height }}
        className="relative flex flex-col items-center rounded-[6.71px] bg-[#fffff7]"
      >
        {/* Top Branding Section */}
        <div className="mt-6 flex items-center justify-center gap-1">
          <img src={Logo} alt="Logo" className={textLogoHeight} />
        </div>

        {/* Center Image Module */}
        <div className="flex-1 w-full flex items-center justify-center py-2">
          <div className="w-full aspect-square sm:aspect-4/5 overflow-hidden shadow-md">
            <img
              src={customImage || weddingData.coupleImage}
              alt="Frame Memory"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Details Section */}
        <div className="mb-8 flex flex-col items-center px-2 text-center mt-2">
          <p
            className={`${titleSize} text-[#244D42] font-constantia font-bold italic uppercase tracking-[0.05em]`}
          >
            {weddingData.names} {weddingData.eventTitle}
          </p>
          <p
            className={`${dateSize} text-[#D4A373] font-carattere italic leading-none mt-2`}
          >
            {weddingData.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrameCard2;
