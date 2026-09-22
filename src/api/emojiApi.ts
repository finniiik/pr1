import axios from "axios";

export interface IEmojiItem {
  emoji: string;
  title: string;
  keywords: string;
}

const API_URL = "http://localhost:3000/api/emojis";

export const getEmojis = async (query?: string): Promise<IEmojiItem[]> => {
  const params = query ? { q: query } : undefined;
  const response = await axios.get<IEmojiItem[]>(API_URL, { params });
  return response.data;
};
