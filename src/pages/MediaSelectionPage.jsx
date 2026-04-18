import React, { useRef } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";

function MediaSelectionPage({ onFilesSelected }) {
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleGalleryClick = () => {
    galleryInputRef.current.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefef6] flex flex-col items-center px-8 pt-36 font-sans">
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={galleryInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*,video/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        capture="environment"
        className="hidden"
      />

      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-[#2A514C] text-[25px] font-serif font-semibold">
          Share your memories
        </h1>
        <p className="text-[#8E9F9C] text-[15px] font-light opacity-90">
          Capture the moments that matter most
        </p>
      </div>

      {/* Action Cards Container */}
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Take Photo/Video Card */}
        <button
          onClick={handleCameraClick}
          className="w-full bg-[#f4f4ee] p-6 h-[110px] rounded-[16px] flex items-center gap-6 active:scale-[0.98] transition-all"
        >
          <div className="w-[48px] h-[48px] bg-[#2A514C] rounded-full flex items-center justify-center shrink-0">
            <Camera className="text-white w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-[#2A514C] text-[18px] font-medium leading-tight">
              Take photo or video
            </h3>
            <p className="text-[#8E9F9C] text-[14px] font-light opacity-80 mt-0.5">
              Capture this moment now
            </p>
          </div>
        </button>

        {/* Choose from Gallery Card */}
        <button
          onClick={handleGalleryClick}
          className="w-full bg-[#f4f4ee] p-6 h-[110px] rounded-[16px] flex items-center gap-6 active:scale-[0.98] transition-all"
        >
          <div className="w-[48px] h-[48px] bg-[#D4A373] rounded-full flex items-center justify-center shrink-0">
            <ImageIcon className="text-white w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-[#2A514C] text-[18px] font-medium leading-tight">
              Choose from gallery
            </h3>
            <p className="text-[#8E9F9C] text-[14px] font-light opacity-80 mt-0.5">
              Select your favorite photos
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default MediaSelectionPage;
