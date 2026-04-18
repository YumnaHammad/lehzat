import React, { useState, useRef } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { uploadPhotos } from "../services/api";
import { weddingData } from "../weddingConfig";
import lehzaticon from "../assets/icons/lehzatIcon.png";
import TouchIcon from "../assets/icons/touchicon.png";
import DeleteMediaModal from "../components/DeleteMediaModal";
import LehzatLogo from "../assets/pictures/Logo.png";
import TrashIcon from "../assets/icons/trashicon.png";
import BgIcon from "../assets/icons/bgicon.png";

function UploadsPage({ images, setImages, onShare, eventId }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteClick = (index) => {
    setTargetIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (targetIndex !== null) {
      setImages((prevImages) =>
        prevImages.filter((_, index) => index !== targetIndex),
      );
    }
    setIsDeleteModalOpen(false);
    setTargetIndex(null);
  };

  const handleShare = async () => {
    setIsUploading(true);
    setError(null);
    try {
      const files = images.map((img) => img.file);
      await uploadPhotos(eventId, files);
      onShare();
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload photos. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  console.log(eventId, "eventId");
  return (
    <div
      className={`bg-[#fefef6] min-h-screen flex flex-col items-center relative ${isDeleteModalOpen ? "overflow-hidden" : ""}`}
    >
      {/* Header Section */}
      <div className="bg-[#2a514c] w-full px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 flex items-center justify-between shadow-md">
        <div className="flex flex-col">
          <p className="text-white text-xs sm:text-sm ">
            {weddingData.names} {weddingData.event}
          </p>
          <h1 className="text-white text-lg sm:text-xl font-bold leading-tight">
            Confirm Your Selection
          </h1>
        </div>
        <div className="w-10 h-10 flex items-center justify-center opacity-90">
          <img src={lehzaticon} alt="Logo" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow w-full px-4 sm:px-6 pt-2 overflow-y-auto pb-[180px] relative ">
        <div className="flex gap-1">
          <h2 className="text-black text-[12px] font-bold mb-2.5 ">
            {images.length}
          </h2>
          <h2 className="text-black text-[12px] font-bold mb-2.5 ">
            items selected
          </h2>
        </div>
        {error && (
          <div className="text-red-500 text-xs mb-2 text-center">{error}</div>
        )}
        <div className="absolute top-[20%] sm:top-[22%] right-0 z-0 invert ">
          <img src={BgIcon} alt="BgIcon" />
        </div>
        {/* Image Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md mx-auto ">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*"
            multiple
          />
          {/* Add Button Tile */}
          <div
            onClick={handleAddClick}
            className="aspect-square bg-[#cce8e0] rounded-lg flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 bg-[#17362e] rounded-2xl flex items-center justify-center border-4 border-[#a7d6ca]">
              <Plus className="text-white w-7 h-7" />
            </div>
          </div>

          {/* Uploaded Images */}
          {images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group shadow-sm bg-gray-100"
            >
              <img
                src={img.url}
                alt={`Upload ${index}`}
                className="w-full h-full object-cover"
              />

              {/* Delete Overlay */}
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity">
                {/* Delete Button Container */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(index);
                  }}
                  className="bg-linear-to-br from-[#b58d74] to-[#5a3e30] p-1 sm:p-1.5 rounded-[12px] "
                >
                  <div className="border-2 border-white rounded-[10px] p-1.5 sm:p-2 ">
                    <img src={TrashIcon} alt="Trash" className="w-5 h-5 " />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fefef6] border-t-2 border-[#cbcbc5] pt-3 pb-4 px-4 sm:px-6 flex flex-col items-center z-40 min-h-[160px] sm:min-h-[180px]">
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <button
            onClick={handleShare}
            className="w-[min(343px,100%)] h-[60px] sm:h-[60px] bg-[#2a514c] text-white flex items-center justify-center gap-2 rounded-full font-bold text-[14px] sm:text-[16px] shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
            disabled={images.length === 0 || isUploading}
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="font-bold text-[14px] font-wix">
                  Share Your Memories
                </span>
                <img src={TouchIcon} alt="Touch" className="w-[24px] h-[24px]" />
              </>
            )}
          </button>

          <p className="text-black text-xs sm:text-sm text-center leading-snug   ">
            By uploading, you confirm you have rights to these photos and agree
            to our{" "}
            <a href="#" className="underline text-[#be6c3e]">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-[#be6c3e]">
              Terms of Service
            </a>
          </p>

          {/* Footer Branding */}
          <div className="w-full border-t border-[#ce9b7d]/30 pt-2 flex justify-center items-center gap-2 px-4 sm:px-6">
            <span className="text-black text-[14px]">Powered by:</span>
            <div className="flex items-center gap-1.5">
              <img src={LehzatLogo} alt="Logo" className="h-5 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Media Confirmation Modal */}
      <DeleteMediaModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default UploadsPage;
