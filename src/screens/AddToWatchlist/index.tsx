import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';

import {StackScreenProps} from '@react-navigation/stack';
import {WatchlistStackParamList} from '../../navigations/WatchlistStackNavigator';
import {Item, ItemType} from '../../components/StockItem';
import Icon from 'react-native-vector-icons/Ionicons';

import {AddWatchlistContainer} from '../../components/AddWatchlistContainer';

type AddtoWatchlistProp = StackScreenProps<
  WatchlistStackParamList,
  'AddToWatchlist'
>;

type ItemProp = {
  item: ItemType;
};

import {MainContainer} from '../../components/MainContainer';
import {useFetchStockList} from '../../hooks/useFetchStockList';

export const AddToWatchlistScreen = ({navigation}: AddtoWatchlistProp) => {
  const [value, onChangeText] = React.useState('');
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
  const snapPoints = useMemo(() => ['25%', '50%'], []);

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
      <View style={[styles.headerContainer, styles.wrapper]}>
        <TouchableOpacity
          onPress={() => {
            // back button pressed
            navigation.pop(1);
          }}>
          <Icon size={25} name={'arrow-back'} color={'black'} />
        </TouchableOpacity>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder={'Search company'}
          autoFocus
          selectionColor={'black'}
          style={styles.searchBar}
        />
      </View>
      <BottomSheetModalProvider>
        <FlatList
          data={listings.state.listings}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
          keyboardShouldPersistTaps="always"
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
  wrapper: {
    marginHorizontal: 15,
  },
  headerContainer: {
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7edff',
    marginBottom: 5,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  textInput: {
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    // elevation: 2,
    backgroundColor: '#2585d9',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  sheetContainer: {
    padding: 20,
    // backgroundColor: 'red',
  },
});
