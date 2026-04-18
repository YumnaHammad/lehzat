import React, { useState } from "react";
import { User, ArrowRight } from "lucide-react";
import UserIcon from "../assets/icons/usericon.png";
import LehzatLogo from "../assets/pictures/Logo.png";

function ShareNameModal({ onShare, onSkip }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onShare(name);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60  px-6">
      <div className="bg-[#f2f2f2] w-full max-w-[340px] rounded-[2rem] p-6 sm:p-7 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300 min-h-[335px]">
        <p className="text-black text-[10px] sm:text-[11px] font-medium mb-1 opacity-80 ">
          Event Created with:
        </p>

        <div className="flex  gap-2 mb-4 justify-center">
          <img src={LehzatLogo} alt="Logo" className="h-[29px]" />
        </div>

        <p className="w-full max-w-[264px]  text-[#1A1A1A] text-[14px] sm:text-[15px] font-medium mb-2">
          Share your name with the host:
        </p>

        <div className="w-[min(100%,264px)] relative ">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src={UserIcon} alt="user" className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g Anan Salem"
            className="w-full  h-[48px] sm:h-[52px] bg-white border-2 border-[#b3b3b3]  rounded-[0.3rem] pl-14 sm:pl-16 pr-6 text-[12px] sm:text-[13px]  text-[#1A1A1A] outline-none shadow-sm transition-all font-semibold placeholder:text-gray focus:border-[#2b514c]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className={`w-full max-w-[264px] sm:max-w-[280px] h-[50px] sm:h-[56px] rounded-full flex items-center justify-center gap-2 font-bold text-[14px] sm:text-[15px] mb-4 mt-4 transition-all shadow-xl active:scale-95 ${
            name.trim()
              ? "bg-[#2b514c] text-white"
              : "bg-[#2b514c] text-white cursor-not-allowed"
          }`}
        >
          Share My Name
          <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
        </button>

        <button
          onClick={onSkip}
          className="w-full max-w-[264px] sm:max-w-[280px] h-[50px] sm:h-[56px] rounded-full border-2 border-[#2a514c] text-[#2a514c] font-medium text-[14px] sm:text-[15px] active:scale-95 transition-all"
        >
          I don’t want to share my name
        </button>
      </div>
    </div>
  );
}

export default ShareNameModal;
