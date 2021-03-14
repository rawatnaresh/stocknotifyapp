/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {WatchlistStackParamList} from '../../navigations/WatchlistStackNavigator';
import {Item, ItemType} from '../../components/StockItem';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [modalState, setModalState] = React.useState<{
    visible: boolean;
    data: any;
  }>({
    visible: false,
    data: null,
  });

  const renderItem = ({item}: ItemProp) => (
    <Item item={item} renderAddWatchUI />
  );
  return (
    <MainContainer>
      <View style={[styles.headerContainer, styles.wrapper]}>
        <TouchableOpacity
          onPress={() => {
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
      <FlatList
        data={listings.state.listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
        keyboardShouldPersistTaps="always"
      />
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
});
