import React from "react";
import { Download, Share2 } from "lucide-react";
import { weddingData } from "../weddingConfig";
import BgIcon from "../assets/icons/bgicon.png";

function InstallAppPage({ images = [], activities = [] }) {
  // Activities are now passed from props to stay synced with ThankYouPage

  const displayPhotos =
    images.length > 0
      ? images.slice(0, 6).map((item, index) => ({
          id: `user-${index}`,
          url: item.url,
          time: index % 2 === 0 ? "1 min ago" : "Just now",
        }))
      : [
          { id: 1, url: weddingData.coupleImage, time: "1 min ago" },
          { id: 2, url: weddingData.heroImage, time: "4 min ago" },
          {
            id: 3,
            url: weddingData.coupleImage2 || weddingData.coupleImage,
            time: "Just now",
          },
          { id: 4, url: weddingData.heroImage, time: "4 min ago" },
          {
            id: 5,
            url: weddingData.coupleImage2 || weddingData.coupleImage,
            time: "Just now",
          },
          { id: 6, url: weddingData.coupleImage, time: "1 min ago" },
        ];

  return (
    <div className="min-h-screen bg-[#FDFDF7] flex flex-col overflow-x-hidden">
      {/* Hero Section - Matching ThankYouPage */}
      <div className="relative w-full bg-[#244D42]">
        <div className="relative w-full h-[280px] overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-[204px] rounded-bl-[100px] overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${weddingData.coupleImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
            }}
          />

          {/* Share Button Overlay */}
          <button className="absolute bottom-14 right-6 w-14 h-14 bg-[#be6c3e] rounded-full flex items-center justify-center shadow-xl border-4 border-[#686e65] z-10">
            <Share2 className="text-white w-6 h-6" />
          </button>

          {/* Header Text Area */}
          <div className="absolute bottom-4 left-6">
            <p className="text-white text-[10px] font-medium tracking-wide mb-1.5 opacity-80">
              {weddingData.names} {weddingData.event}
            </p>
            <h1 className="text-white text-[18px] font-semibold leading-tight">
              Install Lahzat To View Full Album!
            </h1>
          </div>
        </div>
      </div>
<div className="absolute top-42 invert right-0 z-0 opacity-50 ">
          <img src={BgIcon} alt="BgIcon" />
        </div>
      {/* Activity List Container */}
      <div className="px-5 py-2 space-y-2.5 w-full ">
        {activities.slice(0, 3).map((activity) => (
          <div
            key={activity.id}
            className="bg-[#f2f2f2] p-4 pr-5 rounded-[2.5rem] flex items-center justify-between shadow-sm border border-[#e9e8e8] h-[57px]"
          >
            <div>
              <p className="font-bold text-[#1A1A1A] text-[14px] tracking-tight">
                {activity.type}
              </p>
              <p className="text-[#727272] text-[12px]">
                Shared by{" "}
                <span className=" text-[#1A1A1A]">{activity.sharer}</span>
              </p>
            </div>
            <div className="bg-[#be6c3e] text-white text-[12px] px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap w-[69px] h-[19px] flex items-center justify-center">
              {activity.time}
            </div>
          </div>
        ))}
        <div className="h-px bg-[#ce9b7d] opacity-40 mx-2" />
      </div>

      {/* Shared by Guests Section */}
      <div className="relative flex-1">
        <div className="px-5 pb-48">
          <h2 className="text-[19px] font-bold text-[#1A1A1A] mb-4">
            Shared by Guests:
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {displayPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-[1.2rem] overflow-hidden shadow-md"
              >
                <img
                  src={photo.url}
                  alt="Guest memory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#be6c3e]/80 backdrop-blur-sm text-white text-[9px] px-2.5 py-1 rounded-full font-bold">
                  {photo.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating CTA Footer with Strong Fade */}
        <div className="fixed bottom-0 left-0 w-full pt-20 pb-10 bg-linear-to-t from-[#FDFDF7] via-[#FDFDF7] via-60% to-transparent flex flex-col items-center justify-end z-20">
          <div className="w-full px-6 flex flex-col items-center">
            <p className="text-black font-medium text-[12px] mb-4 text-center leading-relaxed opacity-90 max-w-[300px] h-[30px]">
              To view the full album & download photos from the event, please
              download the app.
            </p>
            <button className="w-full max-w-[360px] bg-[#244D42] text-white py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-[14px] shadow-2xl active:scale-95 transition-all">
              <Download className="w-5 h-5 stroke-[2.5px]" />
              Install Lahzat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallAppPage;
