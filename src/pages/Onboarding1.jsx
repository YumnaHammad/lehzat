import React from "react";
import { useWeddingData } from "../context/WeddingContext";
import calender from "../assets/icons/calendaricon.png";
import TouchIcon from "../assets/icons/touchicon.png";
import LehzatWhite from "../assets/pictures/lehatwhite.png";
import BgIcon from "../assets/icons/bgicon.png";


function Onboarding1({ onNext }) {
  const { weddingData } = useWeddingData();
  return (
    <div className="bg-[#fefef6] min-h-screen flex flex-col items-center ">
      <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center pb-44 flex-1 justify-center ">
        <div className="relative flex w-full  justify-center items-center mt-1">
          <div className="w-full max-w-[346px] aspect-square">
            <img
              src={weddingData.coupleImage}
              alt="Wedding Couple"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="absolute top-24 md:top-32 right-0 invert opacity-50 pointer-events-none">
          <img src={BgIcon} alt="BgIcon" />
        </div>
        <div className="bg-[#2a514c] text-white p-2 font-semibold rounded-full  flex justify-center items-center gap-2 text-xs sm:text-sm h-[28px] px-3 min-w-[120px] mt-4">
          <div>
            <img src={calender} alt="calender icon" />
          </div>
          <div>{weddingData.date}</div>
        </div>
        <div className="text-center mt-2">
          <h1 className="text-[#333333] text-2xl sm:text-xl md:text-4xl font-constantia font-bold leading-tight">
            {weddingData.names}
          </h1>
          <h1 className="text-[#be6c3e] text-4xl sm:text-4xl md:text-5xl font-carattere mt-2">
            {weddingData.event}
          </h1>
        </div>
        <div className="w-full max-w-[330px] border-t border-[#ce9b7d] pt-2 mt-2"></div>
        <div className="mt-2 w-full max-w-[331px] text-center">
          <p className="text-black text-sm sm:text-base font-medium ">
            {weddingData.hosttext}
          </p>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2a514c] w-full mt-auto py-4">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <p className="text-white text-xs sm:text-sm text-center font-medium max-w-[280px] sm:max-w-[320px] mt-2">
            It would take just a second.
          </p>

          <button
            onClick={onNext}
            className="
        w-full max-w-[343px]
        h-[60px] 
        flex items-center justify-center gap-2
        rounded-full bg-[#225d51]
        text-white font-semibold text-sm sm:text-base tracking-tight
        border-y border-white/30
      "
          >
            <span>Start Sharing Memories</span>
            <img
              src={TouchIcon}
              alt="Touch Icon"
              className="w-[24px] h-[24px] object-contain"
            />
          </button>
        </div>

        <div className="mt-4 mx-auto w-full max-w-[335px] border-t border-[#ce9b7d]"></div>

        <div className="mt-2 text-white flex justify-center items-center gap-2 ">
          <p>Powered by:</p>
          <img src={LehzatWhite} alt="LehzatIcon" className="h-6" />
        </div>
      </div>
    </div>
  );
}

export default Onboarding1;
