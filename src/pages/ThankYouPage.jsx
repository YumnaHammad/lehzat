import React, { useState, useEffect } from "react";
import { getEventPhotos, getEventStats } from "../services/api";
import { weddingData } from "../weddingConfig";
import { Share2, ArrowRight } from "lucide-react";
import ShareNameModal from "../components/ShareNameModal";
import BgIcon from "../assets/icons/bgicon.png";
function ThankYouPage({
  onRestart,
  uploadedImages = [],
  activities,
  setActivities,
  guestName,
}) {
  const [apiPhotos, setApiPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const BASE_URL = weddingData.API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch public photo list which contains all needed data for guests
        const res = await getEventPhotos(weddingData.EVENT_ID);

        if (res.success && res.data) {
          const apiPhotosArr = res.data.photos || [];
          setApiPhotos(apiPhotosArr);

          // Aggregate uploader statistics for the activity feed
          const uploaderMap = {};
          apiPhotosArr.forEach(photo => {
            const name = photo.guest_name || photo.uploader?.username || "Guest";
            if (!uploaderMap[name]) {
              uploaderMap[name] = { name, count: 0, lastUpload: photo.created_at };
            }
            uploaderMap[name].count += 1;
            if (new Date(photo.created_at) > new Date(uploaderMap[name].lastUpload)) {
              uploaderMap[name].lastUpload = photo.created_at;
            }
          });

          const apiActivities = Object.values(uploaderMap)
            .sort((a, b) => new Date(b.lastUpload) - new Date(a.lastUpload))
            .map((u, i) => ({
              id: `api-stat-${i}`,
              type: `${u.count} Photos`,
              sharer: u.name,
              time: u.lastUpload ? new Date(u.lastUpload).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"
            }));

          setActivities(apiActivities.slice(0, 3));

          // Update local stats mock-up for UI
          setStats({ total_photos: apiPhotosArr.length });
        }
      } catch (err) {
        console.error("Failed to fetch event data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Automatically add user's activity if name is known
    if (guestName) {
      const newUserActivity = {
        id: Date.now(),
        type: uploadedImages.length > 0 ? `${uploadedImages.length} Photos` : "Guest Activity",
        sharer: guestName,
        time: "Just now",
      };
      setActivities((prev) => {
        // Only add if not already added 
        const alreadyAdded = prev.some(a => a.sharer === guestName && a.time === "Just now");
        if (alreadyAdded) return prev;
        return [newUserActivity, ...prev].slice(0, 3);
      });
    }
  }, [guestName, uploadedImages.length, setActivities]);

  // Use the total_photos from API data, otherwise fallback to local count
  const memoriesCount = apiPhotos.length || uploadedImages.length || 0;



  // Combine user uploads with some mock data if empty
  const displayPhotos =
    apiPhotos.length > 0
      ? apiPhotos.map((photo, index) => ({
        id: photo.id || `api-${index}`,
        url: photo.url || photo.photo_url || photo.image_url, // Handle various potential field names
        time: photo.created_at ? new Date(photo.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
      }))
      : uploadedImages.length > 0
        ? uploadedImages.map((img, index) => ({
          id: `user-${index}`,
          url: img.url,
          time: "Just now",
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
    <>
      <div className="min-h-screen bg-[#FDFDF7] flex justify-center">
        <div className="w-full max-w-[420px] bg-[#FDFDF7] flex flex-col overflow-x-hidden pb-8">
          <div className="relative w-full bg-[#244D42]">
            <div className="relative w-full h-[280px] sm:h-[300px] overflow-hidden ">
              <div
                className="absolute top-0 left-0 w-full h-[204px] rounded-bl-[100px] sm:rounded-bl-[100px] overflow-hidden shadow-lg"
                style={{
                  backgroundImage: `url(${weddingData.coupleImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 20%",
                }}
              />

              {/* Share Button Overlay */}
              <button className="absolute bottom-14 right-6 w-14 h-14 bg-[#be6c3e] rounded-full flex items-center justify-center shadow-xl border-4 border-[#686e65] z-10">
                <Share2 className="text-white w-6 h-6 " />
              </button>

              {/* Bottom Text */}

              <div className="  absolute bottom-4 left-6 ">
                <p className="text-white text-[12px] font-medium tracking-wide mb-1.5">
                  {weddingData.names} {weddingData.eventTitle}
                </p>
                <h1 className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-semibold leading-tight">
                  Thank You For Sharing Your Memories!
                </h1>
              </div>
            </div>
          </div>
          <div className="absolute top-[43px] sm:top-[50px] invert right-0 z-0 ">
            <img src={BgIcon} alt="BgIcon" />
          </div>
          {/* Activity List Container */}
          <div className=" relative px-4 py-2 space-y-3 w-full min-h-[180px] sm:min-h-[200px]">
            {activities.slice(0, 3).map((activity) => (
              <div
                key={activity.id}
                className="bg-[#f0f0f0] p-4 pr-5 rounded-[2.5rem] flex items-center justify-between shadow-sm border border-[#e9e8e8] h-[57px]"
              >
                <div className="pl-2">
                  <p className="font-bold text-[#1A1A1A] text-[14px] tracking-tight">
                    {activity.type}
                  </p>
                  <p className="text-black text-[12px] ">
                    Shared by{" "}
                    <span className="font-semibold">{activity.sharer}</span>
                  </p>
                </div>
                <div className="bg-[#be6c3e] text-white text-[12px] px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap w-[69px] h-[19px] flex items-center justify-center">
                  {activity.time}
                </div>
              </div>
            ))}
            <div className="h-[1.5px] bg-[#ce9b7d] " />
          </div>

          {/* Shared by Guests Section with Fade Effect */}
          <div className="relative">
            <div className="px-5 py-4 -mt-4 h-[252px] overflow-hidden no-scrollbar">
              <h2 className="text-[16px] font-semibold text-[#404040] ">
                Shared by Guests:
              </h2>
              <div className="grid grid-cols-3 justify-items-center gap-3 sm:gap-4 mt-2">
                {displayPhotos?.slice(0, 2).map((photo) => (
                  <div
                    key={photo.id}
                    className="relative w-[clamp(96px,30vw,108px)] h-[clamp(98px,32vw,110px)] rounded-[1.2rem] overflow-hidden shadow-md"
                  >
                    <img
                      src={`${BASE_URL}${photo.url}`}
                      alt="Guest memory"
                      className="w-full h-full object-cover"
                    />

                    {/* <div className="absolute top-2 right-2 bg-[#be6c3e]/80 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                      {photo.time}
                    </div> */}
                  </div>
                ))}
              </div>
              <div className="fixed bottom-0 left-0 w-full flex justify-center bg-linear-to-t from-[#f2f2f2] via-[#f2f2f2] via-38% to-transparent pb-6 pt-30">
                <div className="w-full max-w-[420px] px-4 flex flex-col items-center gap-2">
                  <p className="text-[#1A1A1A] font-medium text-[13px] text-center">
                    Want to see what other guests are sharing?
                  </p>

                  <button onClick={onRestart} className="w-full bg-[#2a514c] text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 font-bold text-[14px] shadow-xl">

                    See Full Album
                    <ArrowRight className="w-[24px] h-[24px] stroke-[3px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankYouPage;
