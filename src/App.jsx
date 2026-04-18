import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { weddingData } from "./weddingConfig";
import "./App.css";
import Splash from "./components/Splash";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import MediaSelectionPage from "./pages/MediaSelectionPage";
import UploadsPage from "./pages/UploadsPage";
import ThankYouPage from "./pages/ThankYouPage";
import SocialSharePage from "./pages/SocialSharePage";
import InstallAppPage from "./pages/InstallAppPage";
import ChoosePhotoPage from "./pages/ChoosePhotoPage";
import SharePreviewPage from "./pages/SharePreviewPage";
import ShareNameModal from "./components/ShareNameModal";
import { WeddingProvider } from "./context/WeddingContext";

function App() {
  const { eventId: eventIdParam } = useParams();
  const eventId = parseInt(eventIdParam) || weddingData.EVENT_ID;

  const [currentScreen, setCurrentScreen] = useState("splash");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [selectedToShare, setSelectedToShare] = useState(null);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "81 Photos & 22 Videos",
      sharer: "Nour Hamed",
      time: "Just now",
    },
    {
      id: 2,
      type: "17 Photos & 2 Videos",
      sharer: "Muna Nseir",
      time: "1 min ago",
    },
    {
      id: 3,
      type: "47 Photos & 8 Videos",
      sharer: "Ammar Khawar",
      time: "4 min ago",
    },
  ]);

  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("onboarding1");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleAction = () => {
    if (currentScreen === "onboarding1") {
      setCurrentScreen("onboarding2");
    } else if (currentScreen === "onboarding2") {
      setCurrentScreen("mediaselection");
    }
  };

  const handleShareFlowStart = () => {
    setCurrentScreen("thankyou");
  };

  const handleGoToSocial = () => {
    setCurrentScreen("socialshare");
  };

  const handleNameSubmit = (name) => {
    setGuestName(name);
    setIsNameModalOpen(false);
    // After name is set, we want to trigger the file picker. 
    // We'll use a signal or direct ref if possible.
    document.getElementById("hidden-file-input")?.click();
  };

  const handleNameSkip = () => {
    setIsNameModalOpen(false);
    document.getElementById("hidden-file-input")?.click();
  };

  const handleStartSharing = () => {
    if (!guestName) {
      setIsNameModalOpen(true);
    } else {
      document.getElementById("hidden-file-input")?.click();
    }
  };

  const handleGoToChoosePhoto = (frameIndex) => {
    // Only update the frame index if a valid index (number) is passed.
    // When called from the 'Back' button in SharePreviewPage, it receives an event object.
    if (typeof frameIndex === "number") {
      setSelectedFrameIndex(frameIndex);
    }
    setCurrentScreen("choosephoto");
  };

  const handleGoToSharePreview = (selected) => {
    setSelectedToShare(selected);
    setCurrentScreen("sharepreview");
  };

  const handleFinalShare = () => {
    console.log("Saving and sharing...");
    setCurrentScreen("installapp");
  };

  const handleGoToInstall = () => {
    setCurrentScreen("installapp");
  };

  return (
    <WeddingProvider eventId={eventId}>
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="bg-[#fefef6] absolute inset-0 -z-10" />

        {currentScreen === "splash" && <Splash />}

        {currentScreen === "onboarding1" && <Onboarding1 onNext={handleAction} />}

        {currentScreen === "onboarding2" && (
          <Onboarding2
            onStartSharing={handleStartSharing}
            onFilesSelected={(files) => {
              const newImages = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
              }));
              setUploadedImages((prev) => [...prev, ...newImages]);
              setCurrentScreen("uploads");
            }}
          />
        )}

        {currentScreen === "mediaselection" && (
          <MediaSelectionPage
            onFilesSelected={(files) => {
              const newImages = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
              }));
              setUploadedImages((prev) => [...prev, ...newImages]);
              setCurrentScreen("uploads");
            }}
          />
        )}

        {currentScreen === "uploads" && (
          <UploadsPage
            images={uploadedImages}
            setImages={setUploadedImages}
            onBack={() => setCurrentScreen("mediaselection")}
            onShare={handleShareFlowStart}
            eventId={eventId}
            guestName={guestName}
          />
        )}

        {currentScreen === "thankyou" && (
          <ThankYouPage
            onRestart={handleGoToSocial}
            uploadedImages={uploadedImages}
            activities={activities}
            setActivities={setActivities}
            guestName={guestName}
          />
        )}

        {currentScreen === "socialshare" && (
          <SocialSharePage
            onShare={handleGoToChoosePhoto}
            onSkip={handleGoToInstall}
            onBack={() => setCurrentScreen("thankyou")}
          />
        )}

        {currentScreen === "choosephoto" && (
          <ChoosePhotoPage
            images={uploadedImages}
            onBack={handleGoToSocial}
            onChoose={handleGoToSharePreview}
            initialSelection={selectedToShare}
          />
        )}

        {currentScreen === "sharepreview" && (
          <SharePreviewPage
            selectedImage={selectedToShare}
            selectedFrameIndex={selectedFrameIndex}
            onBack={handleGoToChoosePhoto}
            onShare={handleFinalShare}
          />
        )}

        {currentScreen === "installapp" && (
          <InstallAppPage
            images={uploadedImages}
            onBack={() => setCurrentScreen("socialshare")}
            activities={activities}
          />
        )}
        {isNameModalOpen && (
          <ShareNameModal onShare={handleNameSubmit} onSkip={handleNameSkip} />
        )}
      </div>
    </WeddingProvider>
  );
}

export default App;
