import React, { useState } from "react";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { weddingData } from "../weddingConfig";
import LehzatIcon from "../assets/icons/lehzatIcon.png";
import LehzatLogo from "../assets/pictures/Logo.png";
import BgIcon from "../assets/icons/bgicon.png";

function ChoosePhotoPage({ images = [], onChoose, initialSelection = [] }) {
  const [selectedImages, setSelectedImages] = useState(
    Array.isArray(initialSelection) ? initialSelection : [],
  );

  const handleImageClick = (img) => {
    setSelectedImages((prev) => {
      if (prev.includes(img)) {
        return prev.filter((i) => i !== img);
      }
      if (prev.length < 2) {
        return [...prev, img];
      }
      return prev;
    });
  };

  const hasSelection = selectedImages.length > 0;

  return (
    <div className="min-h-screen bg-[#FDFDF7] flex flex-col overflow-x-hidden">
      {/* Premium Teal Header */}
      <div className="bg-[#244D42] pt-4 pb-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* <button
            onClick={onBack}
            className="text-white active:scale-90 transition-transform"
          >
            <ArrowLeft className="w-7 h-7" />
          </button> */}
          <div>
            <p className="text-white text-[12px]  mb-1">
              {weddingData.names} {weddingData.eventTitle}
            </p>
            <h1 className="text-white text-[20px] font-bold leading-tight">
              Confirm Your Selection
            </h1>
          </div>
        </div>

        <div className="w-12 h-12">
          <img
            src={LehzatIcon}
            alt="Wedding Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Grid Content Area */}
      <div className="flex-1 px-5 pt-6 pb-28 overflow-y-auto no-scrollbar">
        <p className="text-[#1A1A1A] text-[12px] font-bold mb-2 ">
          Select one/two photos to share
        </p>
        <div className="absolute top-[20%] sm:top-[22%] right-0 z-0 invert opacity-50 ">
          <img src={BgIcon} alt="BgIcon" />
        </div>
        <div className="grid grid-cols-3 gap-3.5">
          {images.map((img, index) => {
            const isSelected = selectedImages.includes(img);
            return (
              <div
                key={index}
                className="relative aspect-square cursor-pointer active:scale-95 transition-all"
                onClick={() => handleImageClick(img)}
              >
                <img
                  src={img.url}
                  alt={`Selection ${index}`}
                  className={`w-full h-full object-cover rounded-xl transition-all duration-300 ${
                    isSelected
                      ? "opacity-100 ring-4 ring-[#be6c3e] ring-offset-0 shadow-lg"
                      : hasSelection
                        ? "opacity-50"
                        : "opacity-100"
                  }`}
                />

                {/* Selection Checkmark Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-xl animate-in fade-in zoom-in-95 duration-200 ">
                    {/* Smaller Outer Box */}
                    <div className="bg-gradient-to-br from-[#b58d74] to-[#5a3e30] p-1 rounded-[14px] ">
                      {/* Smaller White Border */}
                      <div className="border-2 border-white rounded-[12px] p-1.5 flex items-center justify-center">
                        <Check className="text-white w-6 h-6 stroke-[3.5]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {images.length === 0 && (
            <div className="col-span-3 py-20 text-center opacity-40 italic">
              No photos uploaded items yet
            </div>
          )}
        </div>
      </div>

      {/* Styled Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#FDFDF7]/80 backdrop-blur-md pt-4 pb-4 px-6 border-t-2 border-[#cbcbc6] z-20">
        <button
          onClick={() => hasSelection && onChoose(selectedImages)}
          disabled={!hasSelection}
          className={`w-full py-4.5 rounded-full flex items-center justify-center gap-2 font-bold text-[13px] transition-all shadow-xl active:scale-[0.98] ${
            hasSelection
              ? "bg-[#244D42] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70 shadow-none"
          }`}
        >
          Share To Social Media
          <ArrowRight className="w-5 h-5 stroke-[3.5px]" />
        </button>
        <div className="w-full h-[1.5px] bg-[#ce9b7d] mt-4" />
        {/* Powered By Section */}
        <div className="mt-5 flex justify-center items-center gap-2 opacity-80">
          <p className="text-black text-[13px] font-medium">Powered by:</p>
          <img src={LehzatLogo} alt="Logo" className="h-4" />
        </div>
      </div>
    </div>
  );
}

export default ChoosePhotoPage;
