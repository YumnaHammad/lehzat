import React, { createContext, useContext, useState, useEffect } from "react";
import { getEvent } from "../services/api";
import { weddingData as fallbackData } from "../weddingConfig";

const WeddingContext = createContext();

export const WeddingProvider = ({ eventId, children }) => {
  const [data, setData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) return;

      setIsLoading(true);
      try {
        const response = await getEvent(eventId);
        if (response.success && response.data) {
          const event = response.data;
          console.log(event);
          // Map API fields to UI field names used in components
          const dynamicData = {
            ...fallbackData,
            names: event.event_name?.toUpperCase() || fallbackData.names,
            event: event.settings?.event_type || fallbackData.event,
            eventTitle: event.settings?.event_type || fallbackData.eventTitle,
            date: event.event_date ? new Date(event.event_date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : fallbackData.date,
            location: event.location || fallbackData.location,
            hosttext: event.settings?.greeting_message || fallbackData.hosttext,
            // Use API image if available, otherwise keep fallback
            coupleImage: event.image ? `${fallbackData.API_BASE_URL}${event?.settings?.banner_url}` : fallbackData.coupleImage,
            heroImage: event.image ? `${fallbackData.API_BASE_URL}${event?.settings?.banner_url}` : fallbackData.heroImage,
          };
          console.log("Fallback Data: ", fallbackData.API_BASE_URL);
          console.log("Dynamic Data: ", dynamicData);
          setData(dynamicData);
        }
      } catch (err) {
        console.error("Failed to load dynamic event data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  return (
    <WeddingContext.Provider value={{ weddingData: data, isLoading }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWeddingData = () => {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error("useWeddingData must be used within a WeddingProvider");
  }
  return context;
};
