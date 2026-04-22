import axiosInstance from "../lib/axios";

export const sessionApi = {
  createSession: async (data) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/sessions`,
      data,
    );
    return response.data;
  },

  getActiveSessions: async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/sessions/active`,
    );
    return response.data;
  },
  getMyRecentSessions: async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/sessions/my-recent`,
    );
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/sessions/${id}`,
    );
    return response.data;
  },

  joinSession: async (id) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/sessions/${id}/join`,
    );
    return response.data;
  },
  endSession: async (id) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/sessions/${id}/end`,
    );
    return response.data;
  },
  getStreamToken: async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/chat/token`,
    );
    return response.data;
  },
};
