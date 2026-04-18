import React from "react";
import { Camera, Image as ImageIcon } from "lucide-react";

function MediaUploadModal({ onGallerySelect, onCameraSelect }) {
  // Since the user wants this to be "the same as this page" (the new screen),
  // we render the full-screen layout here.

  return (
    <div className="min-h-screen bg-[#fefef6] flex flex-col items-center px-6 pt-24 font-sans">
      {/* Header Section */}
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-[#2A514C] text-[40px] leading-tight font-serif font-bold mb-3">
          Share your memories
        </h1>
        <p className="text-[#8E9F9C] text-lg font-medium opacity-90">
          Capture the moments that matter most
        </p>
      </div>

      {/* Action Cards Container */}
      <div className="w-full max-w-sm flex flex-col gap-5 px-2 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
        {/* Take Photo/Video Card */}
        <button
          onClick={onCameraSelect}
          className="w-full bg-[#f4f4ee] p-5 h-[110px] rounded-[32px] flex items-center gap-5 active:scale-[0.97] transition-all duration-300 shadow-sm border border-white"
        >
          <div className="w-16 h-16 bg-[#2A514C] rounded-full flex items-center justify-center flex-shrink-0">
            <Camera className="text-white w-8 h-8" />
          </div>
          <div className="text-left">
            <h3 className="text-[#2A514C] text-[20px] font-bold leading-tight">
              Take photo or video
            </h3>
            <p className="text-[#8E9F9C] text-[15px] font-medium leading-relaxed opacity-80">
              Capture this moment now
            </p>
          </div>
        </button>

        {/* Choose from Gallery Card */}
        <button
          onClick={onGallerySelect}
          className="w-full bg-[#f4f4ee] p-5 h-[110px] rounded-[32px] flex items-center gap-5 active:scale-[0.97] transition-all duration-300 shadow-sm border border-white"
        >
          <div className="w-16 h-16 bg-[#D4A373] rounded-full flex items-center justify-center flex-shrink-0">
            <ImageIcon className="text-white w-8 h-8" />
          </div>
          <div className="text-left">
            <h3 className="text-[#2A514C] text-[20px] font-bold leading-tight">
              Choose from gallery
            </h3>
            <p className="text-[#8E9F9C] text-[15px] font-medium leading-relaxed opacity-80">
              Select your favorite photos
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default MediaUploadModal;
