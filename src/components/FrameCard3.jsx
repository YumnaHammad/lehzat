import React from "react";
import { weddingData } from "../weddingConfig";
import lehzatLog from "../assets/pictures/lehzatlog.png";

const FrameCard3 = ({
  customImage,
  width = "230px",
  height = "388px",
  logoHeight = "h-7",
  titleSize = "text-[10px]",
  dateSize = "text-[16px]",
  polaroid1Width = "w-[108px]",
  polaroid2Width = "w-[122px]",
  p1Translate = "-translate-x-11 -translate-y-11",
  p2Translate = "translate-x-11 translate-y-11",
  p1Rotate = "rotate-[-10deg]",
  p2Rotate = "rotate-[10deg]",
  p2TextSize = "text-[12px]",
  p1PaddingBottom = "pb-6",
  p2PaddingBottom = "pb-2",
}) => {
  const images = Array.isArray(customImage) ? customImage : [customImage];
  const isMultiple = images.length >= 2;

  const bgImage = images[0] || weddingData.coupleImage;
  const topLeftImage = images[0] || weddingData.coupleImage;
  const bottomRightImage =
    (isMultiple ? images[1] : images[0]) || weddingData.coupleImage;

  return (
    <div className="flex-none snap-center">
      {/* Collage Frame Container */}
      <div
        style={{ width, height }}
        className="relative overflow-hidden rounded-[6.71px] bg-[#1A1A1A]/40 "
      >
        {/* Blurred Background Context */}
        <div className="absolute inset-0 w-full h-full overflow-hidden blur-[4px] opacity-80 scale-110">
          <img
            src={bgImage}
            alt="Background Blur"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Depth Gradients */}
        <div className="absolute inset-x-0 top-0 h-110 bg-linear-to-b from-[#2A514C] opacity-[35%] to-transparent" />

        {/* Top Branding */}
        <div className="absolute top-4 left-0 right-0 flex items-center justify-center gap-1.5 px-4 z-10">
          <img
            src={lehzatLog}
            alt="Icon"
            className={`${logoHeight} drop-shadow-lg`}
          />
        </div>

        {/* Polaroid Collage Section */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8 ">
          {/* Top-Left Polaroid (Warm Tan) */}
          <div
            className={`relative ${polaroid1Width} bg-[#cf9c7e] p-1.5 ${p1PaddingBottom} shadow-2xl ${p1Rotate} ${p1Translate} animate-in fade-in slide-in-from-left-4 duration-1000`}
          >
            <div className="aspect-4/5 w-full overflow-hidden bg-black/10">
              <img
                src={topLeftImage}
                alt="Memory 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom-Right Polaroid (Cloud White) */}
          <div
            className={`absolute ${polaroid2Width} bg-[#d9d9d9] p-2 ${p2PaddingBottom} shadow-2xl ${p2Rotate} ${p2Translate} animate-in fade-in slide-in-from-right-4 duration-1000 delay-200`}
          >
            <div className="aspect-4/5 w-full overflow-hidden bg-black/5 mb-2">
              <img
                src={bottomRightImage}
                alt="Memory 2"
                className="w-full h-full object-cover"
              />
            </div>
            <p className={`text-[#244D42] ${p2TextSize} font-constantia font-bold italic tracking-tight text-center leading-none uppercase`}>
              A Special Day!
            </p>
          </div>
        </div>

        {/* Bottom Wedding Details */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center px-2 text-center z-10">
          <p
            className={`${titleSize} text-white font-constantia font-bold italic uppercase tracking-[0.05em] mb-1 drop-shadow-lg`}
          >
            {weddingData.names} {weddingData.eventTitle}
          </p>
          <p
            className={`${dateSize} text-[#D4A373] font-carattere italic drop-shadow-md leading-none`}
          >
            {weddingData.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrameCard3;
