import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, ActivityIndicator, Picker, Linking } from 'react-native';
import { fetchGames, fetchGameDetails } from './api'; // api.js dosyasını içe aktarın

const MainScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [platform, setPlatform] = useState('all');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('release-date');
  const [selectedGameDetails, setSelectedGameDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    fetchGamesData();
  }, [platform, category, sortBy]);

  const fetchGamesData = async () => {
    try {
      const data = await fetchGames(platform, category, sortBy);
      setGames(data);
    } catch (error) {
      console.error('API isteği sırasında bir hata oluştu:', error);
    }
  };

  const showDetailsModal = async (game) => {
    try {
      setIsLoadingDetails(true);
      const data = await fetchGameDetails(game.id);
      setSelectedGameDetails(data);
    } catch (error) {
      console.error('Oyun detayları çekilirken bir hata oluştu:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const openGame = (url) => {
    if (url) {
      Linking.openURL(url);
    } else {
      console.error('Oyun URL bulunamadı.');
    }
  };

  return (
    <View>
      {/* Kategori seçeneklerini düğmelerle ekleyin */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <Button title="Tümü" onPress={() => setCategory('all')} />
        <Button title="MMORPG" onPress={() => setCategory('mmorpg')} />
        <Button title="Shooter" onPress={() => setCategory('shooter')} />
        <Button title="Strateji" onPress={() => setCategory('strategy')} />
        {/* Diğer kategori düğmelerini ekleyin */}
      </View>

      {/* Sıralama seçeneği */}
      <Picker
        selectedValue={sortBy}
        onValueChange={(itemValue) => setSortBy(itemValue)}
        style={{ width: '50%', alignSelf: 'center', marginVertical: 10 }}
      >
        <Picker.Item label="Çıkış Tarihi" value="release-date" />
        <Picker.Item label="Popülerlik" value="popularity" />
        <Picker.Item label="Alfabetik Sıralama" value="alphabetical" />
        <Picker.Item label="İlgililik" value="relevance" />
      </Picker>

      {/* Oyun listesini göstermek için FlatList kullanın */}
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Platform: {item.platform}</Text>
            <Text>Kategori: {item.category}</Text>
            <Button title="Detaylar" onPress={() => showDetailsModal(item)} />
            {/* "Oyunu Oyna" butonu ekleyin ve tıklama işlevselliğini ekleyin */}
            <Button
              title="Oyunu Oyna"
              onPress={() => openGame(item.gameUrl)} // item.gameUrl, oyunun web sitesi URL'sini içerir
            />
          </View>
        )}
      />

      {/* Oyun detaylarını göstermek için bir Modal kullanın */}
      <Modal visible={selectedGameDetails !== null} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {isLoadingDetails ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedGameDetails?.name}</Text>
              <Text>Platform: {selectedGameDetails?.platform}</Text>
              <Text>Kategori: {selectedGameDetails?.category}</Text>
              <Text>Çıkış Tarihi: {selectedGameDetails?.releaseDate}</Text>
              {/* Diğer oyun bilgilerini buraya ekleyin */}
              <Button title="Kapat" onPress={() => setSelectedGameDetails(null)} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default MainScreen;
