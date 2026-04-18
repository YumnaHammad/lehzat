import React from "react";
import DeleteLogo from "../assets/pictures/DeleteLogo.png";
import DeleteIcon from "../assets/icons/DeleteIcon.png";

const DeleteMediaModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center ">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-[#f2f2f2] w-full max-w-[312px] rounded-[20px] overflow-hidden flex flex-col shadow-2xl h-[379px]">
        {/* Top White Section */}
        <div className="bg-[#f0f0f0] p-4 flex flex-col items-center text-center">
          <img
            src={DeleteLogo}
            alt="Delete Illustration"
            className="w-[120px] h-[120px] mb-2"
          />
          <h3 className="text-[20px] font-bold text-black mb-1  ">
            Delete This Media?
          </h3>
          <p className="text-black text-[12px] px-4">
            You can always add the media again
          </p>
        </div>

        {/* Bottom Gray Section */}
        <div className="p-6 flex flex-col gap-3 bg-[#e8e8e8] pt-2 px-6 border-t-2 border-[#cfcfcf]">
          <button
            onClick={onConfirm}
            className="w-full h-[60px] bg-[#c31a00] text-white flex items-center justify-center gap-2 rounded-full font-bold text-[16px] shadow-lg active:scale-[0.98] transition-all"
          >
            <img src={DeleteIcon} alt="trash" className="w-5 h-5 " />
            Delete Media
          </button>
          <button
            onClick={onClose}
            className="w-full h-[60px] bg-transparent border-2 border-[#2a514c] text-[#2a514c] rounded-full font-semibold text-[16px] active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMediaModal;
