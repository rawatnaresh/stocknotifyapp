import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {WatchlistStackParamList} from '../../navigations/WatchlistStackNavigator';
import {MainContainer} from '../../components/MainContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

type WatchlistProp = StackScreenProps<WatchlistStackParamList, 'Watchlist'>;

import {Item, ItemType} from '../../components/StockItem';
import {AddWatchlistContainer} from '../../components/AddWatchlistContainer';
import {useFetchStockList} from '../../hooks/useFetchStockList';

type ItemProp = {
  item: ItemType;
};

export const WatchlistScreen = ({navigation}: WatchlistProp) => {
  const listings = useFetchStockList();
  const [selectedItem, setSelectedItem] = useState<{
    id: Number;
    symbol: string;
    securityName: string;
    name: string;
    activeStatus: string;
    watched: boolean;
  }>({
    id: 0,
    symbol: '',
    securityName: '',
    name: '',
    activeStatus: '',
    watched: false,
  });
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

  const showBottomModal = useCallback((item) => {
    setSelectedItem(item);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleItemPress = useCallback(() => {
    navigation.navigate('StockDetail');
  }, [navigation]);

  const renderItem = ({item}: ItemProp) => (
    <Item
      item={item}
      handleItemPress={handleItemPress}
      showBottomModal={showBottomModal}
    />
  );
  return (
    <MainContainer>
      <BottomSheetModalProvider>
        <FlatList
          data={listings.state.listings}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
          ListHeaderComponent={
            <View style={styles.wrapper}>
              <Text style={styles.screenHeader}>Watchlists</Text>
              <TouchableOpacity
                style={[styles.addBtn]}
                onPress={() => navigation.navigate('AddToWatchlist')}>
                <Icon name={'add-circle-outline'} color={'#fff'} size={25} />
                <Text style={styles.addBtnText}>ADD</Text>
              </TouchableOpacity>
            </View>
          }
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}>
          <AddWatchlistContainer item={selectedItem} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  screenHeader: {
    fontWeight: '700',
    fontSize: 24,
    color: '#626364',
    marginBottom: 20,
  },
  wrapper: {
    marginHorizontal: 15,
  },
  addBtn: {
    borderRadius: 20,
    padding: 5,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2585d9',
    marginBottom: 10,
  },
  addBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 10,
  },
  item: {
    backgroundColor: '#e7edff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subTitle: {
    color: '#2585d9',
    fontWeight: '700',
    fontSize: 12,
  },
  companyLogo: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
  },
  stockPriceContainer: {
    backgroundColor: '#fbfbfb',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  stockPrice: {
    fontWeight: '700',
    fontSize: 12,
  },
});
