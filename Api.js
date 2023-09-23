import axios from 'axios';

const BASE_URL = 'https://www.freetogame.com/api';

export const fetchGames = async (platform, category, sortBy) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/games?platform=${platform}&category=${category}&sort-by=${sortBy}`
    );
    return response.data;
  } catch (error) {
    console.error('API isteği sırasında bir hata oluştu:', error);
    throw error;
  }
};

export const fetchGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${BASE_URL}/game?id=${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Oyun detayları çekilirken bir hata oluştu:', error);
    throw error;
  }
};

export const filterGamesByTags = async (tags, platform) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter?tag=${tags.join('.')}&platform=${platform}`);
    return response.data;
  } catch (error) {
    console.error('Oyunlar filtrelenirken bir hata oluştu:', error);
    throw error;
  }
};
