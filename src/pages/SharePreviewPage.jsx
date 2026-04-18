import React from "react";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import FrameCard1 from "../components/FrameCard1";
import FrameCard2 from "../components/FrameCard2";
import FrameCard3 from "../components/FrameCard3";
import LehzatLogo from "../assets/pictures/Logo.png";
import BgIcon from "../assets/icons/bgicon.png";

function SharePreviewPage({
  selectedImage,
  onBack,
  onShare,
  selectedFrameIndex,
}) {
  // Extract URLs if selectedImage contains objects
  const getUrl = (img) => (img && typeof img === "object" ? img.url : img);

  const imagesToPreview = Array.isArray(selectedImage)
    ? selectedImage.map(getUrl)
    : [getUrl(selectedImage)];

  const isDoublePhoto = imagesToPreview.length === 2;
  return (
    <div className="min-h-screen bg-[#FDFDF7] flex flex-col  overflow-hidden">
      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2 max-w-[420px] mx-auto w-full">
        <button
          onClick={onBack}
          className="p-2 text-black active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>

        <h1 className="text-black text-[12px] font-medium ">
          Share Your Memories
        </h1>

        <button className="bg-[#be6c3e] p-3 rounded-[12px] w-[44px] h-[44px] flex items-center justify-center  text-white">
          <Download className="w-[24px] h-[24px] stroke-[2.5px]" />
        </button>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar -mt-12 ">
        <div className="flex flex-col items-center gap-8 sm:gap-10 py-6 pb-32 ">
      {isDoublePhoto ? (
        <div className="transition-all duration-500 animate-in fade-in zoom-in-95  ">
          <div className="my-6 sm:my-8">
            <FrameCard3
              customImage={imagesToPreview}
              width="min(88vw, 333px)"
              height="475px"
              logoHeight="h-9"
              titleSize="text-[18px]"
              dateSize="text-[30px]"
              polaroid1Width="w-[167px]"
              polaroid2Width="w-[167px]"
              p1Translate="-translate-x-15 -translate-y-12"
              p2Translate="translate-x-17 translate-y-9"
              p1PaddingBottom="pb-7"
              p2PaddingBottom="pb-4"
              p2TextSize="text-[18px]"
            />
          </div>
        </div>
      ) : (
        imagesToPreview.map((url, idx) => (
          <div
            key={idx}
            className="transition-all duration-500 animate-in fade-in zoom-in-95 "
          >
            <div className="my-6 sm:my-8  ">
              {selectedFrameIndex === 0 ? (
                <FrameCard1
                  customImage={url}
                  width="min(88vw, 333px)"
                  height="475px"
                  logoHeight="h-11"
                  titleSize="text-[17px]"
                  dateSize="text-[30px]"
                />
              ) : selectedFrameIndex === 1 ? (
                <FrameCard2
                  customImage={url}
                  width="min(88vw, 333px)"
                  height="475px"
                  textLogoHeight="h-7"
                  titleSize="text-[18px]"
                  dateSize="text-[30px]"
                />
              ) : (
                <FrameCard3
                  customImage={url}
                  width="min(88vw, 333px)"
                  height="475px"
                  logoHeight="h-10"
                  titleSize="text-[17px]"
                  dateSize="text-[30px]"
                  polaroid1Width="w-[156px]"
                  polaroid2Width="w-[177px]"
                  p1Translate="-translate-x-10 -translate-y-9"
                  p2Translate="translate-x-7 translate-y-9"
                />
              )}
            </div>
          </div>
        ))
      )}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#FDFDF7]/90 backdrop-blur-md pt-4 px-6 border-t-2 border-[#cbcbc5] z-20">
        <button
          onClick={onShare}
          className="w-full h-[62px] bg-[#244D42] text-white rounded-full font-bold text-[14px] flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all mb-4"
        >
          Share To Social Media
          <ArrowRight className="w-6 h-6" />
        </button>

        <div className="w-full h-px bg-[#ce9b7d] mb-3" />

        {/* Branding */}
        <div className="flex justify-center items-center gap-2 opacity-90 mb-3">
          <p className="text-[#1A1A1A] text-[13px] font-medium">Powered by:</p>
          <img src={LehzatLogo} alt="Logo" className="h-5" />
        </div>
      </div>
    </div>
  );
}

export default SharePreviewPage;
