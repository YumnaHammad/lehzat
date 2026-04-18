import React, { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FrameCard1 from "../components/FrameCard1";
import FrameCard2 from "../components/FrameCard2";
import FrameCard3 from "../components/FrameCard3";
import BgIcon from "../assets/icons/bgicon.png";

function SocialSharePage({ onShare, onSkip, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const itemWidth = 201; // Card width (190) + gap (24)
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="  bg-[#fffff7] flex flex-col items-center pt-10 ">
      {/* Header bar */}
      <div className="w-full flex items-center px-3 mb-10 max-w-[420px] mx-auto">
        <button
          onClick={onBack}
          className="text-[#2A514C] active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <h1 className="flex-1 text-[#2A514C] text-[15px] font-bold text-center">
          Share Your Memories With Love
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-[#2A514C] text-[13px] px-4 text-center">
        Want To Share It With Your Friends? Do It With a Style!
      </p>
      <div className="absolute top-[160px] sm:top-[180px] right-0 z-0 invert pointer-events-none  ">
        <img src={BgIcon} alt="BgIcon" />
      </div>
      {/* Framed Previews (Scrollable Carousel) */}
      <div className="w-full flex justify-center relative mb-4 mt-2">
        <div className="w-full max-w-[420px] px-2 ">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 gap-[11px] scroll-smooth"
          >
            <FrameCard1 />
            <FrameCard3 />
            <FrameCard2 />
          </div>
        </div>
      </div>
      {/* Pagination Dots above carousel */}
      <div className="flex gap-2 mb-6 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "bg-[#2A514C] w-[9px] h-[9px] opacity-100"
                : "bg-[#2A514C] w-[6px] h-[6px] opacity-50"
            }`}
          />
        ))}
      </div>
      <div className="h-[180px] flex-shrink-0" />
      {/* Footer text and buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-[#FEFEF6] border-t border-[#ccccc6] z-20 shadow-[0_-10px_25px_rgba(0,0,0,0.08)] max-h-[45vh]">
        <div className="max-w-[420px] mx-auto px-4 pt-3">
          <p className="text-black text-[12px] text-center mb-2 max-w-[343px] ">
            Select images on the next page to share on social media with your
            custom frame
          </p>

          <div className="w-full flex flex-col gap-4">
            <button
              onClick={() => onShare(activeIndex)}
              className="w-full max-w-[343px] mx-auto h-[60px] bg-[#2A514C] text-white rounded-full font-bold text-[13px] flex items-center justify-center gap-1 shadow-[0px_1px_53.6px_0px_rgba(0,0,0,0.25)] active:scale-[0.98] transition-all"
            >
              Share To Social Media
              <ArrowRight className="w-6 h-6" />
            </button>

            <button
              onClick={onSkip}
              className="w-full max-w-[343px] mx-auto h-[55px] border-2 border-[#2A514C] text-[#2A514C] rounded-full font-medium text-[14px] active:scale-[0.98] transition-all mb-2"
            >
              Skip For Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialSharePage;
