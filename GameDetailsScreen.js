import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const GameDetailsScreen = ({ route }) => {
  const { game } = route.params;
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://www.freetogame.com/api/game?id=${game.id}`);
        if (response.data) {
          setGameDetails(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Oyun detayları çekilirken bir hata oluştu:', error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [game]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{game.name}</Text>
          <Text>Platform: {game.platform}</Text>
          <Text>Kategori: {game.category}</Text>
          <Text>Çıkış Tarihi: {game.releaseDate}</Text>
          {/* Otomatik olarak çekilen diğer oyun bilgilerini burada gösterin */}
        </View>
      )}
    </View>
  );
};

export default GameDetailsScreen;
