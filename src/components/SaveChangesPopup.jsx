import React from "react";

function SaveChangesPopup({ isOpen, onSave, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 animate-in fade-in duration-300">
      <div
        className="w-full max-w-sm bg-white rounded-[40px] p-8 flex flex-col items-center animate-in zoom-in duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[#1A1A1A] text-2xl font-bold mb-4 font-outfit text-center">
          Save your changes?
        </h2>

        <p className="text-[#6B6B6B] text-center text-sm leading-relaxed mb-8 px-2 font-poppins">
          You've made changes to your memories. Would you like to save these
          updates or cancel to go back?
        </p>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={onSave}
            className="w-full py-4 bg-[#2A514C] text-white rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
          >
            Save
          </button>

          <button
            onClick={onCancel}
            className="w-full py-4 bg-[#E8E8E1] text-[#2A514C] rounded-2xl font-bold text-lg active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveChangesPopup;
