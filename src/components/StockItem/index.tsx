import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// import {useFetchStockList} from '../../hooks/useFetchStockList';

export type ItemType = {
  id: Number;
  symbol: string;
  securityName: string;
  name: string;
  activeStatus: string;
  watched: boolean;
};

type ItemProp = {
  item: ItemType;
  handleItemPress: () => void;
  showBottomModal: (item: any) => void;
};

export const Item = ({item, handleItemPress, showBottomModal}: ItemProp) => {
  // const handleAddWatchlist = () => {
  //   stockListing.addToWatchlist({
  //     symbol: item.symbol,
  //     minAmount: +minInput,
  //     maxAmount: +maxInput,
  //   });
  //   setShowAdder(false);
  // };

  const handleActionPress = React.useCallback(() => showBottomModal(item), [
    item,
    showBottomModal,
  ]);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={handleItemPress}
      activeOpacity={0.5}>
      <View style={styles.content}>
        <View style={styles.p20}>
          <Text style={styles.title}>{item.symbol}</Text>
          <View style={styles.watchContainer}>
            <Text style={styles.subTitle}>$6000</Text>
            <Text style={styles.subTitle}>(6.71%)</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.p20} onPress={handleActionPress}>
          <Icon
            size={25}
            name={item.watched ? 'remove-circle-outline' : 'add-circle-outline'}
            color={'#2585d9'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e7edff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subTitle: {
    color: '#2585d9',
    fontWeight: '700',
    fontSize: 12,
    marginRight: 10,
  },
  p20: {
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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

  textInput: {
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
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
  adder: {
    marginTop: 20,
  },
  watchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
