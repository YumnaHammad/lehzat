import React, { useRef, useState, useEffect } from "react";
import { weddingData } from "../weddingConfig";
import calender from "../assets/icons/calendaricon.png";
import TouchIcon from "../assets/icons/touchicon.png";
import LehzatLogo from "../assets/pictures/Logo.png";
import { getEventPhotos } from "../services/api";

const Onboarding2 = ({ onFilesSelected, onStartSharing }) => {
  const fileInputRef = useRef(null);
  const [totalMemories, setTotalMemories] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getEventPhotos(weddingData.EVENT_ID);
        if (res.success && res.data) {
          setTotalMemories(res.data.photos?.length || 0);
        }
      } catch (err) {
        console.error("Failed to fetch stats for onboarding:", err);
      }
    };
    fetchStats();
  }, []);

  const handleButtonClick = () => {
    if (onStartSharing) {
      onStartSharing();
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col pb-[160px]  ">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        capture="environment"
        id="hidden-file-input"
        className="hidden"
      />
      {/* Top Part: Background and Text Overlay */}
      <div className="relative flex-grow w-full">
        {/* Background Image */}
        <img
          src={weddingData.coupleImage}
          alt="Wedding Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-[78%] sm:h-[75%] md:h-[70%] bg-linear-to-t from-[#2A514C]/80 via-[#2A514C]/30 to-transparent" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 md:px-8 ">
          <div className="translate-y-5">
            <div className="bg-[#bf6e3f] text-white px-4 sm:px-5 md:px-6 py-1.5 rounded-full flex items-center gap-2 w-fit mb-2">
              <img src={calender} alt="calendar" className="w-4 h-4" />
              <span className="text-[12px] font-semibold">
                {weddingData.date}
              </span>
            </div>

            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-constantia font-bold tracking-wider uppercase leading-tight drop-shadow-md   ">
              {weddingData.names}
            </h1>
            <h2 className="text-[#ce9b7d] text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-carattere  leading-tight">
              {weddingData.event}
            </h2>
          </div>

          {/* Thin Horizontal Line */}
          <div className="w-full max-w-[330px] border-t border-[#ce9b7d] my-6 mx-auto mb-2"></div>

          <p className="text-white text-sm sm:text-base md:text-lg leading-snug px-2 sm:px-4 md:px-6 mb-4 mt-2 drop-shadow-sm">
            {weddingData.hosttext}
          </p>
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className=" fixed bottom-0 left-0 right-0 pb-safe bg-[#fefef6] w-full h-[160px]">
        <div className="w-full flex flex-col justify-center items-center gap-2 mt-3">
          <p className="text-black text-[12px] text-center font-medium max-w-[280px]">
            It would take just a second.
          </p>

          <button
            onClick={handleButtonClick}
            className="w-[min(343px,100%)] h-[60px] bg-[#2a514c] text-white flex items-center justify-center gap-3 rounded-full font-bold text-[18px] border-[#9cd7cc]/60 border"
          >
            <span className="font-bold text-[16px] ">
              Start Sharing Memories
            </span>
            <img
              src={TouchIcon}
              alt="Touch Icon"
              className="w-[24px] h-[24px] object-contain"
            />
          </button>

        </div>
        <div className="mt-3 mx-auto flex flex-col justify-center items-center w-[335px] z-30  border-t border-[#ce9b7d] "></div>
        <div className=" mt-3 px-4 sm:px-6 text-black flex justify-center items-center gap-2">
          <p>Powered by:</p>
          <img src={LehzatLogo} alt="LehzatIcon" className="h-6" />
        </div>
      </div>
    </div>
  );
}

export default Onboarding2;
