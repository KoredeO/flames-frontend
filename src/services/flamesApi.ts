import {
  FlamesResult,
  FlamesResponse,
  FlamesHistoryResponse,
} from "../types/flames";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SessionData {
  id: string;
  expiresAt: number;
}

export const flamesApi = {
  async calculateFlames(nameOne: string, nameTwo: string): Promise<FlamesResult | undefined> {
    try {
      const { id: sessionId } = this.getOrCreateSession();
      const response = await fetch(`${API_BASE_URL}/flames/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameOne, nameTwo, sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate FLAMES");
      }

      const data: FlamesResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error("Failed to calculate FLAMES:", error);
      return undefined;
    }
  },

  async getHistory(): Promise<FlamesResult[]> {
    try {
      const { id: sessionId } = this.getOrCreateSession();
      const response = await fetch(
        `${API_BASE_URL}/flames/history?sessionId=${sessionId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data: FlamesHistoryResponse = await response.json();
      return data.data;
    } catch (error) {
      // Return empty array for demo
      return [];
    }
  },

  getOrCreateSession(): SessionData {
    const stored = localStorage.getItem("flames_session");
    if (stored) {
      const session = JSON.parse(stored) as SessionData;
      if (session.expiresAt > Date.now()) {
        return session;
      }
    }

    const newSession = {
      id: Math.random().toString(36).substr(2, 9),
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour from now
    };

    localStorage.setItem("flames_session", JSON.stringify(newSession));
    return newSession;
  },

  async deleteHistoryItem(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/flames/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete history item');
      }
    } catch (error) {
      console.error('Error deleting history item:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<FlamesResult | undefined> {
    try {
      const response = await fetch(`${API_BASE_URL}/flames/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch FLAMES result');
      }

      const data: FlamesResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching FLAMES result:', error);
      return undefined;
    }
  },
};
