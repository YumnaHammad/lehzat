import { weddingData } from "../weddingConfig";

const BASE_URL = weddingData.API_BASE_URL;

export const uploadPhotos = async (eventId, files, guestName) => {
  const formData = new FormData();
  formData.append("event_id", eventId);
  if (guestName) {
    formData.append("guest_name", guestName);
  }
  files.forEach((file) => {
    formData.append("photos", file);
  });

  const response = await fetch(`${BASE_URL}/api/photos/guest/bulk`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to upload photos");
  }

  return response.json();
};

export const getEventPhotos = async (eventId, filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.date) queryParams.append("date", filters.date);
  if (filters.featured !== undefined) queryParams.append("featured", filters.featured);

  // Use the public endpoint to avoid 401 Unauthorized for guests
  const response = await fetch(`${BASE_URL}/api/photos/event/${eventId}/public?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event photos");
  }

  return response.json();
};

export const deletePhoto = async (photoId) => {
  const response = await fetch(`${BASE_URL}/api/photos/${photoId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete photo");
  }

  return response.json();
};

export const recordShare = async (photoId, platform) => {
  const response = await fetch(`${BASE_URL}/api/photos/${photoId}/share`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ social_media_platform: platform }),
  });

  if (!response.ok) {
    throw new Error("Failed to record share event");
  }

  return response.json();
};

export const getEventStats = async (eventId) => {
  const response = await fetch(`${BASE_URL}/api/photos/event/${eventId}/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch event stats");
  }

  return response.json();
};

export const getEvent = async (eventId) => {
  const response = await fetch(`${BASE_URL}/api/events/${eventId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event details");
  }

  return response.json();
};
